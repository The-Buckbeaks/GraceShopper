/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

// --- ASSERTIONS ---
const {expect} = require('chai')
const sinon = require('sinon')
const request = require('supertest')
const db = require('../server/db')

// Setting environment to test
process.env.NODE_ENV = 'test'

// --- IMPORTING FILES ---
// Require all files that we would like to test

// Models
const Plant = require('../server/db/models/plant')

// Routes
const app = require('../server/')
const agent = require('supertest')(app)

// Components
import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({adapter: new Adapter()})

// Store
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  plants: [],
  order: {},
  cart: []
}
import reducer from '../client/store/'
const store = mockStore(reducer)

import Cart from '../client/components/cart'
import AllPlants from '../client/components/AllPlants'
import {SingleCartItem} from '../client/components/'
import SinglePlant from '../client/components/SinglePlant'

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
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))
  after(() => db.close())

  beforeEach(async () => {
    const createdPlants = await Plant.bulkCreate(plantData)
    storedPlants = createdPlants.map(plant => plant.dataValues)
  })

  describe('Plant routes', () => {
    describe('Gets all products', () => {
      it('serves up all products via GET `/api/plants`', async () => {
        const response = await agent.get('/api/plants').expect(200)
        expect(response.body).to.have.length(2)
        expect(response.body[0].name).to.equal(storedPlants[0].name)
      })
    })

    describe('Gets a single product', () => {
      it('serves up a single product by its `id` via GET `/api/plants/:id', async () => {
        const response = await agent.get('/api/plants/2').expect(200)
        expect(response.body.name).to.equal('Robert Plant')
      })
    })
  })
})

describe('------- COMPONENTS', () => {
  const plantProp = [
    {
      id: 1,
      name: 'Ringo Seastar',
      description: "I'd like to be under the sea",
      plantOrder: {quantity: 1}
    }
  ]

  describe('<SingleCartItem /> component', () => {
    let mockCartItem
    beforeEach('Create shallow component', () => {
      mockCartItem = shallow(
        <SingleCartItem
          key={plantProp.id}
          item={plantProp}
          plantOrder={plantProp.plantOrder}
        />
      )
    })

    it('renders as a stateless component', () => {
      expect(mockCartItem.instance()).to.equal(null)
    })
    it('displays an image for each item in the cart', () => {
      expect(mockCartItem.contains(<img src={plantProp.imgUrl} />)).to.equal(
        true
      )
    })
  })
})
