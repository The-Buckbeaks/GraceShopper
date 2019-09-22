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
router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id
      },
      include: [{model: Plant}]
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
    // console.log('order FROM ROUTER PUT', order)
    order.removePlants(plants)
    updatedPlants.forEach(plant => {
      PlantOrder.create({
        orderId: order.id,
        plantId: plant.id,
        quantity: plant.quantity,
        price: plant.price
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
    // console.log('UPDATED RAN', order.plants)
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

// SUBMIT ORDER
// Updates an order after checkout
// router.put('/:id', async (req, res, next) => {
//   try {
//     const order = await Order.findById(req.params.id)
//     if (!order) res.sendStatus(404)
//     const {address, shippingMethod, gift, totalCost, checkedOut, userId} = req.body
//     await order.update({
//       address, shippingMethod, gift, totalCost, checkedOut, userId
//     })
//   } catch (err) {
//     next(err)
//   }
// })

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
