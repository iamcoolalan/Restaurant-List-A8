//require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Restaurants = require('./models/restaurants')
const bodyParser = require('body-parser')
const restaurants = require('./models/restaurants')

//start express and set the port
const app = express()
const port = 3000

//setting mongoDB connection
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//use env to protect your personal info
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//setting resources path
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//setting routes

//home page
app.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//create page
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const newRestaurant = req.body
  return Restaurants.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//detail page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//edit page
app.get('/restaurants/:id/edit', (req, res) => {
  return Restaurants.findById(req.params.id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
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
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//search function
app.get('/search', (req, res) => {
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

//start and listen on the Express server
app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})