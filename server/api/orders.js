const router = require('express').Router()
const {Order} = require('../db/models')
const {Plant} = require('../db/models')
const {PlantOrder} = require('../db/models')

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
      include: [{
        model: Plant
      }]
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// UPDATE PLANT ORDER / CART
router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    const plants = await order.getPlants()
    order.removePlants(plants)
    req.body.plants.forEach(plant => {
      const update = {
        orderId: order.id,
        plantId: plant.id,
        quantity: plant.quantity,
        price: plant.price
      }
      const updatedPlantOrder = PlantOrder.create(update)
      res.status(200)
      res.json(updatedPlantOrder)
    })
  } catch (err) {
    next(err)
  }
})

// GET CART
// if there is a req.session.user logged in, find or create order matching user with a status of not checked out?
// router.get('/cart', async (req, res, next) => {
//   try {
//     if (req.session.user) {
//       const userCart = await Order.findOrCreate({
//         where: {
//           userId: req.session.user,
//           checkedOut: false
//         }
//       })
//       if (userCart) res.json(userCart)
//       else res.end()
//     } else {
//       const guestCart = await Order.create()
//       res.status(201)
//       res.json(guestCart)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

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
router.post('/:userId', async (req, res, next) => {
  try {
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

// SUBMIT ORDER
// Updates an order after checkout
router.put('/checkout', async (req, res, next) => {
  try {
    const order = await Order.findById(req.body.id)
    if (!order) res.sendStatus(404)
    const {items, checkedOut, userId} = req.body
    await order.update({
      items,
      checkedOut,
      userId
    })
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
