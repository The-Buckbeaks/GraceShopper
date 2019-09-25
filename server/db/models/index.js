const User = require('./user')
const Plant = require('./plant')
const Order = require('./order')
const PlantOrder = require('./plantOrder')

//Associations
Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Plant, {
  through: PlantOrder,
  foreignKey: 'orderId',
  otherKey: 'plantId'
})
Plant.belongsToMany(Order, {
  through: PlantOrder,
  foreignKey: 'plantId',
  otherKey: 'orderId'
})

module.exports = {
  User,
  Plant,
  Order,
  PlantOrder
}
