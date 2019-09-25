const Sequelize = require('sequelize')
const db = require('../db')

const Plant = db.define('plant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://imgur.com/a/MUYoBu0'
  },
  quantity: Sequelize.INTEGER
})

module.exports = Plant
