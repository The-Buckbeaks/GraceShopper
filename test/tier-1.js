// --- ASSERTIONS ---
const {expect} = require('chai')

// --- IMPORTING FILES ---
//Require all files that we could like to test

//models
//const db = require('../server/db/models')

//Plant model
const Plant = require('../server/db/models/plant')
//plantOrder order model c.p

const Order = require('../server/db/models/order')

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
  //order model c.p
  describe('order model', () => {
    describe('Validations', () => {
      it('requires `gift` property to be either "yes" or "no" (nothing else)', async () => {
        //confirming these work fine
        const order = Order.build()
        await order.save()
        order.gift = 'yes'
        await order.save()
        order.gift = 'no'
        await order.save()
        try {
          order.gift = 'noooo'
          await order.save()
        } catch (err) {
          //expect(err).to.exist
          expect(err.message).to.contain('gift')
          return
        }
        throw Error('order.gift should only be yes/no')
      })
      it('requires `shippingMethod` property to be either "1-Day" or "Standard Ground" (nothing else)', async () => {
        //confirming these work fine
        const newOrder = Order.build()
        await newOrder.save()
        newOrder.shippingMethod = '1-Day'
        await newOrder.save()
        newOrder.shippingMethod = 'Standard Ground'
        await newOrder.save()
        try {
          newOrder.shippingMethod = 'noooo'
          await newOrder.save()
        } catch (err) {
          //expect(err).to.exist
          expect(err.message).to.contain('shippingMethod')
          return
        }
        throw Error(
          'order.shippingMethod should only be "1-Day/standard Ground'
        )
      })
      it(' can handle long `address`', async () => {
        let sillyAddress =
          'this is a hill with a longest name in the world(it is located in New Zealand):Taumata­whakatangihanga­koauau­o­tamatea­turipukaka ­pikimaunga ­horo­nuku­pokaiwhenua­kitana­tahu (85 letters). The city that has the longest name is located in Thailand :Krung-thep-maha-nakorn-boworn-ratana-kosin-mahintar-ayudhya-amaha-dilok-pop-nopa-ratana-rajthani-burirom-udom-rajniwes-mahasat-arn-amorn-pimarn-avatar-satit-sakattiya-visanukam.'
        const result = await Order.create({
          shippingMethod: '1-Day',
          address: sillyAddress
        })
        expect(result.address).to.equal(sillyAddress)
      })

      it('`totalCost` is originally 0', async () => {
        const orderTwo = await Order.build()
        expect(orderTwo.totalCost).to.equal(0)
      })
    })
  })
})
