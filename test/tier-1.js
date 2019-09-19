// --- ASSERTIONS ---
const {expect} = require('chai')
const request = require('supertest')
const db = require('../server/db')

// --- IMPORTING FILES ---
//Require all files that we could like to test

//models
// const db = require('../server/db/models')

//Plant model
const Plant = require('../server/db/models/plant')

//Plant routes
const app = require('../server/')
const agent = require('supertest')(app)

// --- TESTS ---

describe('------- MODELS', () => {
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

describe('------- API ROUTES', () => {
  // defined in ../server/api/plants.js
  let storedPlants

  const plantData = [
    {
      name: 'Tina Ferner',
      description: 'Simply the best.'
    },
    {
      name: 'Robert Plant',
      description: 'Just want to be a fool in the rain!'
    }
  ]

  // This clears your database so you can run tests with dummy data.
  beforeEach(() => {
    return db.sync({force: true})
  })

  beforeEach(async () => {
    const createdPlants = await Plant.bulkCreate(plantData)
    storedPlants = createdPlants.map(plant => plant.dataValues)
  })

  // Route for getting all plants
  describe('Gets all products', () => {
    it('serves up all products via GET `/api/plants`', async () => {
      const response = await agent.get('/api/plants').expect(200)
      expect(response.body).to.have.length(2)
      expect(response.body[0].name).to.equal(storedPlants[0].name)
    })
  })

  // Route for getting a single plant
  describe('Gets a single product', () => {
    it('serves up a single product by its `id` via GET `/api/plants/:id', async () => {
      const response = await agent.get('/api/plants/2').expect(200)
      expect(response.body.name).to.equal('Robert Plant')
    })
  })
})
