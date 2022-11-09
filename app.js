const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
// const restaurantList = require('./restaurant.json')
const port = 3000

// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Mongoose setting
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))

// Template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// Route setting for root
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})
// Route setting for show page
app.get('/restaurants/:id', (req, res) => {
  const restaurants = restaurantList.results
  const restaurant = restaurants.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})
// Route setting for search (by name or category)
app.get('/search', (req, res) => {
  let keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results
  const restaurant = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { restaurant: restaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`The express is listening on http://localhost:${port}`)
})