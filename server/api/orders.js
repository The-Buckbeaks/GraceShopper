const router = require('express').Router()
import {Order} from '../db/models'
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})
