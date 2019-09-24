const router = require('express').Router()
const {Order, Plant, PlantOrder} = require('../db/models')

module.exports = router

// GET ALL ORDERS
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Plant,
          as: 'plants',
          required: false
        }
      ]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//GET CART
router.get('/cart', (req, res, next) => {
  try {
    if (!req.session.cart) req.session.cart = []
    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

// HELPER FUNCTION TO FIND DUPLICATES BEFORE ADDING TO CART
const inCart = (id, cart) => {
  let alreadyInCart = false
  cart.forEach(cartItem => {
    if (cartItem.id === id) {
      alreadyInCart = true
    }
  })
  return alreadyInCart
}

// ADD ITEM TO CART
router.post('/add', (req, res, next) => {
  try {
    if (!req.session.cart) req.session.cart = []
    const {id, name, price, imgUrl, orderQty} = req.body

    if (inCart(id, req.session.cart)) {
      req.session.cart.forEach(cartItem => {
        if (cartItem.id === id) {
          cartItem.orderQty = orderQty + cartItem.orderQty
        }
      })
    } else {
      req.session.cart = [
        ...req.session.cart,
        {id, name, price, imgUrl, orderQty}
      ]
    }
    res.status(201)
    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

//CLEAR CART
// maybe this can be a DELETE request instead?
router.post('/clear', (req, res, next) => {
  try {
    req.session.cart = []
    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

//EDIT ITEM IN CART
// maybe this can be a PUT request instead?
router.post('/edit', (req, res, next) => {
  try {
    const {id, name, price, imgUrl, orderQty} = req.body
    const returnCart = []
    for (let i = 0; i < req.session.cart.length; i++) {
      let plant = req.session.cart[i]
      if (plant.id !== id) {
        returnCart.push(plant)
      } else {
        returnCart.push({id, name, price, imgUrl, orderQty})
      }
    }

    req.session.cart = returnCart

    res.status(201)
    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

// REMOVE ITEM FROM CART
// maybe this can be a PUT request instead?
router.post('/remove', (req, res, next) => {
  try {
    const {id} = req.body
    req.session.cart = req.session.cart.filter(plant => plant.id !== id)
    res.status(201)
    res.json(id)
  } catch (err) {
    next(err)
  }
})

// SUBMITTING AN ORDER
router.post('/submit', async (req, res, next) => {
  try {
    const {address, shippingMethod, gift, userId, totalCost} = req.body
    const {cart} = req.session

    const order = await Order.create({
      address,
      shippingMethod,
      gift,
      checkedOut: true,
      userId,
      totalCost
    })

    cart.forEach(plant => {
      PlantOrder.create({
        orderId: order.id,
        plantId: plant.id,
        quantity: plant.orderQty
      })
    })
    const updatedOrder = await order.update({
      plants: cart
    })
    //this clears cart
    req.session.cart = []
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

// DELETE ORDER
// ADMIN USE ONLY - deleting cart/order from database (not clearing the cart)
router.delete('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    if (!order) res.sendStatus(404)
    const plants = await order.getPlants()
    order.removePlants(plants)
    await Order.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
