const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
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

// Body-parser setting
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`The express is listening on http://localhost:${port}`)
})