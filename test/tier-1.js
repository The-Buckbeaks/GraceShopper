// --- ASSERTIONS ---
const {expect} = require('chai')

// --- IMPORTING FILES ---
//Require all files that we could like to test

//models
const db = require('../server/db/models/')

//Plant model
const Plant = db.model('plant')

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
          expect(error.message).to.contain('name cannot be nukk')
        }
      })
      //
    })
  })
})
