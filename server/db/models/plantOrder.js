const Sequelize = require('sequelize')
const db = require('../db')

const PlantOrder = db.define('plantOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = PlantOrder
