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
      attributes: ['id', 'userId'],
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
    console.log('THIS IS REQ.BODY IN POST-----', req.body)
    const plant = await Plant.findByPk(req.body.id)
    const order = await Order.findOrCreate({
      where: {
        id: req.session.cartId
      },
      include: [{model: Plant}]
    })
    const plantOrderInfo = {
      orderId: req.session.cartId,
      plantId: req.body.id,
      quantity: req.body.orderQty
    }
    console.log('THIS IS ORDER---', order)
    const plantOrder = await PlantOrder.create(plantOrderInfo)
    console.log('THIS IS PLANTORDER', plantOrder)
    // order.addPlant(plant, {
    //   through: { plants: plant }
    // })
    // const plantOrder = await order.addPlant(plant)
    // console.log('THIS IS plantOrder', plantOrder)
    res.json(plantOrder)
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
