const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurants')

//home page
router.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router