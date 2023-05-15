const Restaurants = require('../restaurants')
const restaurantsList = require('../../restaurant.json')
const db = require('../../config/mongoose')

//After finishing creating the seed data close the database
db.once('open', () => {
  console.log('Generate seed data')

  Restaurants.create(restaurantsList.results).finally(() => db.close())
  console.log('Complete!')
})
