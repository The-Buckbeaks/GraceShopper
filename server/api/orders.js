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

// GET SINGLE ORDER
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id
      },
      include: [{model: Plant}]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// ADD TO CART
// Let's refactor this route. We are using it for BOTH submitting orders and for adding items to the cart. We can perhaps make an orders/:id/submit put route and an orders/id/add put route
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

// CREATE NEW GUEST ORDER
// Creating a new cart for an order that is not associated with a user (guest)
router.post('/', async (req, res, next) => {
  try {
    const {plants} = req.body
    const newOrder = await Order.create({
      plants
    })
    res.status(201)
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

// CREATE NEW ORDER FOR USER
// Creating a new cart for an order that has a userId associated with it
router.post('/:orderId', async (req, res, next) => {
  try {
    console.log('ROUTER POST CALLED', req.params)
    if (!req.body) res.sendStatus(500)
    const {plants, checkedOut} = req.body
    const newOrder = await Order.create({
      plants,
      checkedOut,
      userId: req.params.userId
    })
    res.status(201)
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

// DELETE ORDER
// ADMIN USE ONLY - deleting cart/order from database (not clearing the cart)
router.delete('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
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
