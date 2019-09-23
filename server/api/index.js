const permit = require('../permission')
const router = require('express').Router()

//only admin can retrieve API data on users and orders. plants API is public.
router.get(['/users', '/orders'], permit('admin'))
// account update & delete (PUT & DELETE) are only available to admin
router.put(['/users', '/orders', '/plants'], permit('admin'), (req, res) =>
  res.json({message: 'updated'})
)
router.delete(
  ['/users', '/orders', '/orders/:id', '/plants', '/plants/:id'],
  permit('admin'),
  (req, res) => res.json({message: 'deleted'})
)

//all other routes avail to public
router.use('/users', require('./users'))
router.use('/plants', require('./plants'))
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
module.exports = router
