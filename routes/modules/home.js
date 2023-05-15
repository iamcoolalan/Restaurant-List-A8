const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurants')

//sort function
function sortOption(query) {
  switch (query.sort) {
    case '新 > 舊':
      return { condition: { _id: 'desc' }, selectedOption: '新 > 舊' }
    case '舊 > 新':
      return { condition: { _id: 'asc' }, selectedOption : '舊 > 新' }
    case 'A > Z':
      return { condition: { name: 'asc' }, selectedOption : 'A > Z' }
    case 'Z > A':
      return { condition: { name: 'desc' }, selectedOption: 'Z > A' }
    case '類別':
      return { condition: { category: 'asc' }, selectedOption: '類別' }
    case '地區':
      return { condition: { location: 'asc' }, selectedOption: '地區' }
    default:
      return { condition: { name: 'asc' } }
  }
}

//home page
router.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.status(200).render('index', { restaurants }))
    .catch(
      error => {
      console.log(error)
      res.render('errorPage',{error: error.message})
    })
})

//search function
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  //use sort function which define before to sort the restaurant list
  const sort = sortOption(req.query)
  const error = `Can't not find any result with keyword:${keyword}`

  return Restaurants.find()
    .lean()
    .sort(sort.condition)
    .then(restaurants => restaurants.filter(function (restaurant) {
      //find restaurants which match conditions
      const searchByName = restaurant.name.toLowerCase().trim().includes(keyword)
      const searchByCategory = restaurant.category.toLowerCase().includes(keyword)

      return searchByName || searchByCategory
    }))
    .then(restaurants => {
      //if there is no match restaurant then render 'error' page
      if (restaurants.length !== 0) {
        res.status(200).render('index', { restaurants, keyword, selectedOption: sort.selectedOption })
      } else {
        res.status(404).render('error', { error, keyword })
      }
    })
    .catch(
      error => {
        console.log(error)
        res.status(500).render('errorPage', { error: error.message })
      })
})

module.exports = router