//require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

//start express and set the port
const app = express()
const port = 3000

//setting template engine
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  //express-handlebars customs helper
  helpers: {
    //compare whether two values are equal or not.
    checkSelectedValue: function (value1, value2) {
      return value1 === value2
    }
  }
}))
app.set('view engine', 'hbs')

//setting resources path
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)//setting routes

//start and listen on the Express server
app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})