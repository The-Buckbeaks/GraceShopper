const router = require('express').Router()
const Plants = require('../db/models/plant')

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
    res.send(plant)
  } catch (error) {
    next(error)
  }
})

module.exports = router
