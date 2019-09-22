const router = require('express').Router()

module.exports = router

// GET CART
router.get('/', (req, res, next) => {
  try {
    if (req.session.cart) {
      res.send(req.session.cart)
    } else {
      req.session.cart = req.body
    }
  } catch (err) {
    next(err)
  }
})

// ADD ITEM TO CART
router.post('/', async (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = []
    } else {
      console.log('IN POST REQUEST, REQ SESSION EXISTS')
      req.session.cart = [...req.session.cart, req.body]
      await res.send(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})

// // UPDATE QUANTITY ON ITEM IN CART
// router.put('/', (req, res, next) => {
//   try {
//     console.log('THIS IS REQ.BODY IN CART PUT REQUEST---', req.body)

//   } catch (err) {
//     next(err)
//   }
// })
