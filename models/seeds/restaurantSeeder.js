const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('./restaurant.json').results
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USERS = [
  {
    name: 'USER1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantIndex: [0, 1, 2]
  },
  {
    name: 'USER2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantIndex: [3, 4, 5]
  }
]

db.once('open', async () => {
  await Promise.all(SEED_USERS.map(async (user) => {
    const { name, email, password, restaurantIndex } = user
    const salt = await (bcrypt.genSalt(10))
    const hash = await (bcrypt.hash(password, salt))
    const createdUser = await User.create({
      name,
      email,
      password: hash
    })
    const restaurant = restaurantIndex.map(index => {
      restaurantList[index].userID = createdUser._id
      return restaurantList[index]
    })
    await Restaurant.create(restaurant)
  }))
  console.log('done.')
  process.exit()
})

//助教提供的insertMany寫法
// db.once('open', () => {
//   Restaurant.insertMany(restaurants)
//     .then(() => console.log('done!'))
//     .catch(error => console.log(error))
// })