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
router.get('/cart', async (req, res, next) => {
  try {
    if (!req.session.cart) req.session.cart = []
    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

// SUBMITTING AN ORDER
router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Plant
        }
      ]
    })
    const {
      address,
      shippingMethod,
      gift,
      totalCost,
      checkedOut,
      userId
    } = req.body
    const plants = await order.getPlants()
    const updatedPlants = [...plants, req.body]
    // order.removePlants(plants)
    updatedPlants.forEach(plant => {
      PlantOrder.create({
        orderId: order.id,
        plantId: plant.id,
        quantity: req.body.quantity
      })
    })
    const updatedOrder = await order.update({
      plants: updatedPlants,
      address,
      shippingMethod,
      gift,
      totalCost,
      checkedOut,
      userId
    })
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

//CLEAR CART
router.post('/clear/', async (req, res, next) => {
  try {
    req.session.cart = []
    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

// CREATE NEW CART
// Creating a new cart for an order
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create()
    if (req.session.userId) {
      order.setUser(req.session.userId)
    }
    if (!req.session.cartId) {
      req.session.cartId = order.id
    }
    res.status(201)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// ADD ITEM TO CART
router.post('/add', async (req, res, next) => {
  try {
    const {id, name, price, imgUrl, orderQty} = req.body
    if (!req.session.cart) req.session.cart = []
    req.session.cart = [
      ...req.session.cart,
      {id, name, price, imgUrl, orderQty}
    ]
    res.status(201)
    res.json(req.session.cart[req.session.cart.length - 1])
  } catch (err) {
    next(err)
  }
})

// REMOVE ITEM FROM CART
router.post('/remove/', async (req, res, next) => {
  try {
    const {id} = req.body
    req.session.cart = req.session.cart.filter(plant => plant.id !== id)
    res.status(201)
    res.json(id)
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
