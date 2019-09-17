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
    type: Sequelize.DECIMAL(10, 2)
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://imgur.com/a/MUYoBu0'
  },
  quantity: Sequelize.INTEGER
  //Siwin: We can add columns for "on sale", "light requirements", etc later
})

module.exports = Plant

//Siwin: We need to add methods for checking out (i.e., decrement quantity in inventory etc)
