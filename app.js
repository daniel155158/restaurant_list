const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const port = 3000

// 在非正式環境時使用dotenv
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
app.use(methodOverride('_method'))

// Body-parser setting
app.use(bodyParser.urlencoded({ extended: true }))

// Route setting for root
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})
// Route setting for new page
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
app.post('/restaurants/new', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// Route setting for show page (detail)
app.get('/restaurants/:_id', (req, res) => {
  const id = req.params._id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})
// Route setting for edit
app.get('/restaurants/:_id/edit', (req, res) => {
  const id = req.params._id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
app.put('/restaurants/:_id', (req, res) => {
  const id = req.params._id
  const editRestaurant = req.body
  return Restaurant.updateOne({ _id: id }, editRestaurant)
    .then(() => res.redirect(`/restaurants/${id}/edit`))
    .catch(error => console.log(error))
})
// Route setting for delete
app.delete('/restaurants/:_id', (req, res) => {
  const id = req.params._id
  return Restaurant.deleteOne({ _id: id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// Route setting for search (by name or category)
app.get('/search', (req, res) => {
  let keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then(restaurantList => {
      const restaurants = restaurantList.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`The express is listening on http://localhost:${port}`)
})