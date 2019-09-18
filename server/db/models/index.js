const User = require('./user')
const Plant = require('./plant')
const Order = require('./order')
const PlantOrder = require('./plantOrder')

//Associations
//User to orders, one to many
Order.belongsTo(User)
User.hasMany(Order)
//Orders to plants, many to many

// Plant.belongsTo(Order) //we've commented out this end of the association because we don't want the order Ids to be in the plant table, only the other way around
Order.belongsToMany(Plant, {through: PlantOrder})
Plant.belongsToMany(Order, {through: PlantOrder})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Plant,
  Order,
  PlantOrder
}
