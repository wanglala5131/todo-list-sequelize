const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const usePassport = require('./config/passport')
const router = require('./routes')

const db = require('./models')
const Todo = db.Todo
const User = db.User

const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(router)



app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})