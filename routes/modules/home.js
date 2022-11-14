const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// Route setting for root
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})
// Route setting for search (by name or category)
router.get('/search', (req, res) => {
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

module.exports = router