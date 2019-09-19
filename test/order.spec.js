const {expect} = require('chai')
const db = require('../server/db/models')
const Order = require('../server/db/models/plant')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})
