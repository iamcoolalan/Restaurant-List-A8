const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurants')

//create page
router.get('/new', (req, res) => {
  res.status(200).render('new')
})

router.post('/', (req, res) => {
  const newRestaurant = req.body
  return Restaurants.create(newRestaurant)
    .then(() => res.status(302).redirect('/'))
    .catch(
      error => {
        console.log(error)
        res.status(500).render('errorPage', { error: error.message })
      })
})

//detail page
router.get('/:id', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .lean()
    .then(restaurant => {
      if (!restaurant) {
        res.status(404).render('errorPage', { error: `Can't find any result that matches this ID` })
      } else {
        res.status(500).render('show', { restaurant })
      }
    })
    .catch(
      error => {
        console.log(error)
        res.status(500).render('errorPage', { error: error.message })
      })
})

//edit page
router.get('/:id/edit', (req, res) => {
  return Restaurants.findById(req.params.id)
    .lean()
    .then(
      restaurant => {
        if (!restaurant) {
          res.status(404).render('errorPage', { error: `Can't find any result that matches this ID` })
        } else {
          res.status(200).render('edit', { restaurant })
        }
      })
    .catch(
      error => {
        console.log(error)
        res.status(500).render('errorPage', { error: error.message })
      })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const update = req.body

  return Restaurants.findById(id)
    .then(restaurant => {
      if(!restaurant){
        res.status(404).render('errorPage', { error: `Can't find any result that matches this ID` })
      }else{
        Object.assign(restaurant, update)
        return restaurant.save()
      }
    })
    .then(() => res.status(302).redirect(`/restaurants/${id}/edit`))
    .catch(
      error => {
        console.log(error)
        res.status(500).render('errorPage', { error: error.message })
      })
})

//delete function
router.delete('/:id', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .then(restaurant => {
      if(!restaurant){
        res.status(404).render('errorPage', { error: `Can't find any result that matches this ID` })
      }else{
        restaurant.remove()
      }
    })
    .then(() => res.redirect('/'))
    .catch(
      error => {
        console.log(error)
        res.status(500).render('errorPage', { error: error.message })
      })
})

module.exports = router