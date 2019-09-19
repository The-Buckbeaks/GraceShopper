const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  address: {
    type: Sequelize.TEXT
  },
  shippingMethod: {
    type: Sequelize.ENUM('1-Day', 'Standard Ground')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  },
  gift: {
    type: Sequelize.ENUM('yes', 'no'),
    defaultValue: 'no'
  },
  totalCost: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  checkedOut: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
  //Siwin: We can add a shipped date, payment method, etc later
})

module.exports = Order

//Siwin: We need to add methods for checking out (i.e., calculating tax, shipping and handling, decrement inventory etc)
