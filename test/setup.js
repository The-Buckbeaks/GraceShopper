//Siwin: These tests will replace the database (force: true) before and after every test

const db = require('../server/db/models')
before(() => db.sync({force: true}))
afterEach(() => db.sync({force: true}))
after(() => db.close())
