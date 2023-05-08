const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurants')

//create page
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const newRestaurant = req.body
  return Restaurants.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//detail page
router.get('/:id', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//edit page
router.get('/:id/edit', (req, res) => {
  return Restaurants.findById(req.params.id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const update = req.body

  return Restaurants.findById(id)
    .then(restaurant => {
      Object.assign(restaurant, update)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}/edit`))
    .catch(error => console.log(error))
})

//delete function
router.delete('/:id', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router