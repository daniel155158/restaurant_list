const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000

// Template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// Route setting for root
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
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