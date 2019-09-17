const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  items: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false
  },
  shippingMethod: {
    type: Sequelize.ENUM('1-Day', 'Standard Ground')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  },
  gift: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  totalCost: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0
  }
  //Siwin: We can add a shipped date, payment method, etc later
})

module.exports = Order

//Siwin: We need to add methods for checking out (i.e., calculating tax, shipping and handling, decrement inventory etc)