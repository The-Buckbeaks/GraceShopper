const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

// GET ALL ORDERS
router.get('/', async (req, res, next) => {
  try {
    if (req.session.user) res.json(req.session.user)
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// GET SINGLE ORDER
// router.get('/:id', async (req, res, next) => {
//   try {
//     const order = await Order.findOne({
//       where: {
//         id: req.params.id
//       }
//     })
//     res.json(order)
//   } catch (err) {
//     next(err)
//   }
// })

// GET CART
// if there is a req.session.user logged in, get order where
router.get('/cart', async (req, res, next) => {
  try {
    if (req.session.user) {
      const userCart = await Order.findOrCreate({
        where: {
          userId: req.session.user,
          checkedOut: false
        }
      })
      if (userCart) res.json(userCart)
      else res.end()
    } else {
      const guestCart = await Order.create()
      res.status(201)
      res.json(guestCart)
    }
  } catch (err) {
    next(err)
  }
})

// // CREATE NEW GUEST ORDER
// // Creating a new cart for an order that is not associated with a user (guest)
// router.post('/', async (req, res, next) => {
//   try {
//     if (!req.body) res.sendStatus(500)
//     const {address, items, shippingMethod, gift, totalCost} = req.body
//     const newOrder = await Order.create({
//       address,
//       items,
//       shippingMethod,
//       gift,
//       totalCost
//     })
//     res.status(201)
//     res.json(newOrder)
//   } catch (err) {
//     next(err)
//   }
// })

// CREATE NEW ORDER FOR USER
// Creating a new cart for an order that has a userId associated with it
router.post('/:userId', async (req, res, next) => {
  try {
    if (!req.body) res.sendStatus(500)
    const {
      address,
      items,
      shippingMethod,
      date,
      gift,
      totalCost,
      checkedOut
    } = req.body
    const newOrder = await Order.create({
      address,
      items,
      shippingMethod,
      date,
      gift,
      totalCost,
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
    const {
      address,
      items,
      shippingMethod,
      date,
      gift,
      totalCost,
      checkedOut,
      userId
    } = req.body
    await order.update({
      address,
      items,
      shippingMethod,
      date,
      gift,
      totalCost,
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
    await order.destroy
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
