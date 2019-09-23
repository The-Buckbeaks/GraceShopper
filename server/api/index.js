const permit = require('../permission')
const router = require('express').Router()

//only admin can retrieve API data on users and orders. plants API is public.
router.get('/users', permit('admin'))
router.get('/orders', permit('admin'))

router.use('/users', require('./users'))
router.use('/plants', require('./plants'))
router.use('/orders', require('./orders'))

// account update & delete (PUT & DELETE) are only available to admin
router.put('/', permit('admin'), (req, res) => res.json({message: 'updated'}))
router.delete('/', permit('admin'), (req, res) =>
  res.json({message: 'deleted'})
)

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
module.exports = router
