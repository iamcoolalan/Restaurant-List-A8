const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurants')

//search function
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()

  return Restaurants.find()
    .lean()
    .then(restaurants => restaurants.filter(function (restaurant) {
      //find restaurants which match conditions
      const searchByName = restaurant.name.toLowerCase().trim().includes(keyword)
      const searchByCategory = restaurant.category.toLowerCase().includes(keyword)

      return searchByName || searchByCategory
    }))
    .then(restaurants => {
      //if there is no match restaurant then render 'error' page
      if (restaurants.length !== 0) {
        res.render('index', { restaurants, keyword })
      } else {
        res.render('error', { keyword })
      }
    })
    .catch(error => console.log(error))
})

module.exports = router