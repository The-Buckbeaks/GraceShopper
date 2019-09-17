const router = require('express').Router()

router.use('/users', require('./users'))
//api for inventories c.peng line 5-27
const Plants = require('../db/models/plants') //import plants models from db

router.get('/plants', async (req, res, next) => {
  try {
    const allPlants = await Plants.findAll()
    res.send(allPlants)
  } catch (error) {
    next(error)
  }
})

router.get('/plants/:id', async (req, res, next) => {
  try {
    const plant = await Plants.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(plant)
  } catch (error) {
    next(error)
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
module.exports = router
