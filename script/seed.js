'use strict'

const db = require('../server/db')
const {User, Plant, Order, PlantOrder} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123password',
      firstName: 'Cody',
      lastName: 'Coder'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '1234password',
      firstName: 'Murphy',
      lastName: 'Law'
    }),
    User.create({
      email: 'anne@email.edu',
      password: '12345password',
      firstName: 'Anne',
      lastName: 'Zeta'
    })
  ])

  const plants = await Promise.all([
    Plant.create({
      name: 'Cryptocoryne Balansae',
      price: 799,
      quantity: 40,
      imgUrl: `https://i.ebayimg.com/images/g/mbQAAOSwgxBZ1Asj/s-l1600.jpg`,
      description: `Cryptocoryne balansae forms long narrow leaves and is best placed in the mid- to background of large tanks. The hammered look leaves are very striking when planted in a group. It has no special requirements and grows well in medium hard water, however a nutrient-rich substrate and at least moderate lighting are beneficial.`
    }),
    Plant.create({
      name: 'Amazon Sword',
      price: 549,
      quantity: 51,
      imgUrl: `https://www.liveaquaria.com/images/categories/product/lg14360AmazonSword.jpg`,
      description: `The Amazon Sword Plant, Echinodorus amazonicus, is a Rosette plant that is very popular with aquarium hobbyists. They are capable of reaching approximately 20 inches in height under proper water conditions. The Amazon Sword Plant has short rhizomes, numerous lance shaped leaves that are pale to dark green with sharply pointed tips, and fairly short stems. It is an amphibious plant that will grow either partially or fully submersed. Best cultivated in large aquariums, Amazon Sword Plants make a great focal point if used singly. When used in groups, they create an interesting background when grown with other aquarium plants.`
    }),
    Plant.create({
      name: 'Java Moss',
      price: 990,
      quantity: 31,
      imgUrl: `https://cdn.shopify.com/s/files/1/0491/5593/products/Singapore-Moss-03_1_grande.jpg?v=1479285425`,
      description: `Java moss (taxiphyllum barbieriis) a moss belonging to the Hypnaceae family. Native to Southeast Asia, it is commonly used in freshwater aquariums. It attaches to rocks, roots, and driftwood. Java moss makes a nice addition to any tank yet it requires no special gravel or base layer to thrive. Even better, it can attach to gravel or substrates which has the added benefit of keeping it from circulating with the water currents in your tank. In addition, it will attach itself to almost anything in your tank that sits still for long enough, including commercial decorations, rocks, and driftwood.`
    }),
    Plant.create({
      name: 'Pygmy Chain Sword',
      price: 528,
      quantity: 22,
      imgUrl: `https://www.liveaquaria.com/images/categories/product/p330130ChainSwordNarrowLeaf.jpg`,
      description: `This aquarium plant (otherwise called Narrow Leaf) is mostly seen in freshwater. It is a good choice of plant for both a beginner and expert hobbyist. It is normally kept closer to the edge of the aquarium as it doesn’t grow extremely tall. In proper lighting, it can grow to be a thick tangle of foliage. In low lighting, it will grow sparsely. It will have the capacity to survive in any lighting conditions and does not demand a fertilizer supplement. The Pygmy chain sword is widely known as an outstanding plant for beginners since it demands almost no upkeep. The plant will spread over the substrate (material used to cover the base of an aquarium) voluntarily. The plant can then be permitted to propagate in order to grow over the front elevation of the aquarium, thereby forming a stylish foreground.`
    }),
    Plant.create({
      name: 'Water Wisteria',
      price: 699,
      quantity: 34,
      imgUrl: `http://sirensaquatics.com/wp/wp-content/uploads/2018/09/DSC_0888-846x550.jpg`,
      description: `This listing is for three stems of Water Wisteria, between 5 to 8 inches long. It's very easy to grow, taking nutrients from the water column via roots. It can be planted or floated, both producing the wonderful light-green lace-like leaves that will cover your tank in lush natural greenery. Easy to propagate as well, just cut the stem above any new roots that start growing! IMPORTANT! Please be aware, this plant comes from tanks with 7.0 to 7.5 ph, 75-78 degrees Fahrenheit and moderate hardness. If your tank conditions are different, the plant will have to adjust so there might be some melting of the leaves. IT'S NOT DYING. Give it a couple weeks to start growing and feel free to use fertilizer. VERY IMPORTANT! Plant comes from tanks with Ramshorn snails & Bladder snails. They will lay their eggs on the leaves and they are small, transparent, gelatinous clusters. WE DO NOT GUARANTEE THAT THE PLANT IS SNAIL FREE. Buyer accepts this risk at time of purchase and will not have remorse due to any snail hitchhikers. We plan on being able to offer snail-free plants in the future.`
    }),
    Plant.create({
      name: 'Hornwort',
      price: 399,
      quantity: 2,
      imgUrl: `https://www.liveaquaria.com/images/categories/large/lg_Hornwort_Dozen_11285.jpg`,
      description: `Hornwort, also known as Coontail, has sturdy, layered hair-like foliage that helps oxygenate and clarify the water as well as keep algae growth to a minimum. It is found free-floating worldwide, in moving and still waters, or loosely anchored in muddy bottoms. Hornwort leaves are dark green and grow from a 1/2 to 1-1/2 inches long on stems that can reach 24 inches in length. They may be potted or just left to float in the aquarium. It is a brilliant background plant because it develops to the aquarium’s height. The Hornwort needs a minimal lighting and negligible fertilizer supplement.`
    }),
    Plant.create({
      name: 'Red Tiger Lotus',
      price: 699,
      quantity: 82,
      imgUrl: `http://i.ebayimg.com/images/i/252118538576-0-1/s-l1000.jpg`,
      description: `When looking to add plants to a freshwater aquarium, there are endless choices. Color and shape are some important things to consider when trying to achieve the most pleasing look overall. One plant that is both beautiful and relatively simple to maintain, is the Red Tiger Lotus. With its broad, red leaves and interesting growth habits, it can certainly bring a new and stunning aesthetic to an aquarium. Another interesting aspect of Red Tiger Lotus is that it shoots flowers. In the wild, the flowers float up to the top and the colors range anywhere from white to yellow. There are rare occasions where it will shoot a flower and the flower will die off, but a new one will later start coming out. It is usually a clear sign, if you have a Tiger Lotus that is flowering, that the plant is happy.`
    }),
    Plant.create({
      name: 'Cryptocoryne Wendtii',
      price: 749,
      quantity: 12,
      imgUrl: `https://cdn.shopify.com/s/files/1/0311/3149/products/cryptocoryne-wendtii-live-plants-6509243793477_600x.jpg?v=1563297930`,
      description: `Crypts are great plants that are normally displayed in pots in neighborhood fish stores. Crypts in some cases have a terrible reputation since they “liquefy” quickly upon addition to the planted aquarium. This is due to the fact that crypts are less resistant to change compared to other aquatic plants in this rundown. They likewise require a slightly higher amount of light compared to other plants. Hence, they should conceivably be left as an aquarium plant for the marginally advanced aquarist. In any case, they are a good-looking foreground plant that can be recognized by long slim leaves stretching out from a focal point below the substrate. However, upon addition to the planted aquarium, it might appear as if this plant has totally dissolved, but the Crypt is only responding to change. As you keep tending it, the crypt will have the capacity to return to full health as it develops its new root framework in the freshwater aquarium.`
    }),
    Plant.create({
      name: 'Java Fern',
      price: 955,
      quantity: 49,
      imgUrl: `https://www.fishkeepingworld.com/wp-content/uploads/2018/08/Apperance.jpg`,
      description: `Like Java Moss, this is a plant that’s great for freshwater aquariums, that works well with shrimp. The Java Fern likewise prefers low light, and they grow fine when their rhizome (i.e. the green stems which bring forth the leaves) are attached to an ornament or rock. If you have larger Java Fern plant, then you can cover its roots with rock, but you must be watchful when you do this in order to prevent the rhizomes from being buried. Its long, clustered green leaves flourish in low to moderate light, and it serves well both as hiding spots for fish and as a background decoration. Java Fern is a live plant that is simple to grow in your freshwater aquarium, as they discharge spores from the front part of their leaves when it is time for propagation. These spores will just float about until they discover something to tie themselves to, and afterward, they will grow faster.`
    })
  ])

  const orders = await Promise.all([
    Order.create({
      address: '900 Washington Ave., Brooklyn, NY 11225',
      checkedOut: true,
      shippingMethod: 'Standard Ground',
      totalCost: 3245,
      userId: 1
    }),
    Order.create({
      address: '5 Hanover Square, New York, NY 10004',
      checkedOut: true,
      shippingMethod: '1-Day',
      gift: 'yes',
      totalCost: 6680,
      userId: 2
    })
  ])

  const plantOrders = await Promise.all([
    PlantOrder.create({
      orderId: 1,
      plantId: 1,
      quantity: 2,
      price: 799
    }),
    PlantOrder.create({
      orderId: 1,
      plantId: 2,
      quantity: 3,
      price: 549
    }),
    PlantOrder.create({
      orderId: 2,
      plantId: 9,
      quantity: 1,
      price: 955
    }),
    PlantOrder.create({
      orderId: 2,
      plantId: 8,
      quantity: 5,
      price: 749
    }),
    PlantOrder.create({
      orderId: 2,
      plantId: 3,
      quantity: 2,
      price: 990
    })
  ])

  console.log(
    `seeded ${users.length} users, ${plants.length} plants, ${
      orders.length
    } orders, and our plant order join table!`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
