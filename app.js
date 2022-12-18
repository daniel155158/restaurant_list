const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
require('./config/mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const routes = require('./routes')
const port = 3000

// Template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// Body-parser setting
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(methodOverride('_method'))
usePassport(app) // 呼叫Passport函式並傳入app
app.use(routes)

app.listen(port, () => {
  console.log(`The express is listening on http://localhost:${port}`)
})