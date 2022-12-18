const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// Route setting for new page
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/new', (req, res) => {
  const userID = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userID })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// Route setting for show page (detail)
router.get('/:_id', (req, res) => {
  const userID = req.user._id
  const _id = req.params._id
  return Restaurant.findOne({ _id, userID })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})
// Route setting for edit
router.get('/:_id/edit', (req, res) => {
  const userID = req.user._id
  const _id = req.params._id
  return Restaurant.findOne({ _id, userID })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:_id', (req, res) => {
  const userID = req.user._id
  const _id = req.params._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findOne({ _id, userID })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      restaurant.userID = userID
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})
// Route setting for delete
router.delete('/:_id', (req, res) => {
  const userID = req.user._id
  const _id = req.params._id
  return Restaurant.findOne({ _id, userID })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router