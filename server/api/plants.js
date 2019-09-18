const router = require('express').Router()
const Plant = require('../db/models/plant')

router.get('/plants', async (req, res, next) => {
  try {
    const allPlants = await Plant.findAll()
    res.json(allPlants)
  } catch (err) {
    next(err)
  }
})

router.get('/plants/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(plant)
  } catch (err) {
    next(err)
  }
})

module.exports = router
