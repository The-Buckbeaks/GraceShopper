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
    //need to figure out how to retrieve a req.session.cart that is associated with a logged in user
    if (!req.session.cart) req.session.cart = []
    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

// SUBMITTING AN ORDER
router.post('/submit', async (req, res, next) => {
  try {
    const {address, shippingMethod, gift, userId} = req.body
    const {cart} = req.session

    const order = await Order.create({
      address,
      shippingMethod,
      gift,
      checkedOut: true,
      userId
    })

    cart.forEach(plant => {
      PlantOrder.create({
        orderId: order.id,
        plantId: plant.id,
        quantity: plant.quantity
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

//CLEAR CART
router.put('/clear/:id', async (req, res, next) => {
  try {
    const destroyed = PlantOrder.destroy({
      where: {
        orderId: req.params.id
      }
    })

    res.json(destroyed)
  } catch (err) {
    next(err)
  }
})

// ADD ITEM TO CART
router.post('/add', (req, res, next) => {
  try {
    if (!req.session.cart) req.session.cart = []
    req.session.cart = [...req.session.cart, req.body]
    res.status(201)
    res.json(req.session.cart[req.session.cart.length - 1])
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
