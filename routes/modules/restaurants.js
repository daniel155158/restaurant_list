const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// Route setting for new page
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/new', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// Route setting for show page (detail)
router.get('/:_id', (req, res) => {
  const id = req.params._id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})
// Route setting for edit
router.get('/:_id/edit', (req, res) => {
  const id = req.params._id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:_id', (req, res) => {
  const id = req.params._id
  const editRestaurant = req.body
  return Restaurant.findByIdAndUpdate(id, editRestaurant)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// Route setting for delete
router.delete('/:_id', (req, res) => {
  const id = req.params._id
  return Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router