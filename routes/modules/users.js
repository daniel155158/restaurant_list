const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  // 確認填寫資料是否有誤
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '輸入的密碼與確認密碼不同!' })
  }
  if (errors.length) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 確認信箱是否已經有註冊過
  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ message: '此信箱已經註冊過了!' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return User.create({
          name,
          email,
          password,
        })
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))
})

module.exports = router