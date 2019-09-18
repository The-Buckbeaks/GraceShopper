const Sequelize = require('sequelize')
const db = require('../db')

const PlantOrder = db.define('plantOrder', {
  quantity: Sequelize.INTEGER,
  price: Sequelize.INTEGER
})

module.exports = PlantOrder
