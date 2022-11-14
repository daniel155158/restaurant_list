const Restaurant = require('../restaurant')
const restaurants = require('./restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  restaurants.forEach(function (restaurant) {
    Restaurant.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: Number(restaurant.rating),
      description: restaurant.description
    })
  })
  console.log('done!')
})