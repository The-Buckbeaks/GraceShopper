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
const PlantOrder = require('../server/db/models/plantOrder')
const Order = require('../server/db/models/order')

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
import reducer, {
  addItemThunk,
  addItem,
  clearCart,
  clearMyCart,
  createCart
} from '../client/store/'
const store = mockStore(reducer)

import {SingleCartItem, OrderForm} from '../client/components/'

// --- TESTS ---

describe('------- MODELS', () => {
  //defined in '../server/db/models/plant.js'
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
  //defined in 'server/db/models/index.js'
  describe('Plant/Order association', () => {
    let plant1, plant2, order, plantOrder1, plantOrder2, result

    beforeEach(async () => {
      order = await Order.create({
        address: '5 Hanover Square, New York, NY 10004',
        checkedOut: true,
        shippingMethod: '1-Day',
        gift: 'yes',
        totalCost: 6680
      })

      plant1 = await Plant.create({
        name: 'Pete Churplant',
        description: 'I love to catch flies'
      })

      plant2 = await Plant.create({
        name: 'Lily Padd',
        description: 'Life is a pond'
      })

      plantOrder1 = await PlantOrder.create({
        orderId: 1,
        plantId: 1
      })

      plantOrder2 = await PlantOrder.create({
        orderId: 1,
        plantId: 2
      })
      result = await Order.findOne({
        where: {
          id: 1
        },
        include: [{model: Plant}]
      })
    })

    describe('Order', () => {
      it('has associated plants', () => {
        expect(result.plants.length).to.equal(2)
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
      description: 'This plant would like to be under the sea',
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

describe('------- REDUX', () => {
  describe('action and thunk creators', () => {
    // defined in ../client/store

    const plant = {
      name: 'Planty McPlantface',
      description: 'I am green',
      quantity: 2
    }
    const orderId = 1
    const qty = 2

    let mock
    before(() => {
      mock = new MockAdapter(axios)
    })

    afterEach(() => {
      mock.reset()
    })

    after(() => {
      mock.restore()
    })

    describe('`Add item to cart`', () => {
      it('creates an ADD_ITEM action', () => {
        const addItemAction = addItem(plant)
        expect(addItemAction.type).to.equal('ADD_ITEM')
      })
    })

    describe('`Clear cart`', () => {
      it('creates an CLEAR_CART action', () => {
        const clearCartAction = clearMyCart()
        expect(clearCartAction.type).to.equal('CLEAR_CART')
      })
    })

    describe('`Create cart`', () => {
      it('creates an CREATE_CART action', () => {
        const createCartAction = createCart()
        expect(createCartAction.type).to.equal('CREATE_CART')
      })
    })
  })
})
