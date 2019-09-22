// --- ASSERTIONS ---
const {expect} = require('chai')

// --- IMPORTING FILES ---
//Require all files that we could like to test

//models
//const db = require('../server/db/models')

//Plant model
const Plant = require('../server/db/models/plant')
//plantOrder model c.p
const plantOrder = '../server/db/models/plantOder'
//order model c.p
const order = '../server/db/models/order'

// --- TESTS ---

describe('Models', () => {
  //defined in ../server/db/models/plant.js
  describe('Plant model', () => {
    describe('Validations', () => {
      it('requires `name`', async () => {
        const plant = Plant.build()
        try {
          await plant.validate()
          throw Error('validation should fail without name')
        } catch (error) {
          expect(error.message).to.contain('name cannot be null')
        }
      })
      it('sets a default image URL if one is not provided', async () => {
        const plant = Plant.build({
          name: 'plant plant',
          description: 'this is a plant'
        })
        try {
          await plant.validate()
          expect(plant.imgUrl).to.equal('https://imgur.com/a/MUYoBu0')
        } catch (error) {
          expect(error.message).to.contain('imgUrl cannot be null')
        }
      })
    })
  })
})
