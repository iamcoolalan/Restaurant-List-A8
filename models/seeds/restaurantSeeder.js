const Restaurants = require('../restaurants')
const restaurantsList = require('../../restaurant.json')
const db = require('../../config/mongoose')


db.once('open', () => {
  restaurantsList.results.forEach(restaurant => {
    Restaurants.create(restaurant)
  })

  console.log('done')
})
