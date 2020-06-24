const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const Todo = db.Todo

router.get('/login', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then((todos) => {
      return res.render('index', { todos: todos })
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})
router.post('/login', (req, res) => {
  res.send('login-p')
})
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.create({ name, email, password })
    .then(user => res.redirect('/'))
})
router.get('/logout', (req, res) => {
  res.redirect('/users/login')
})

module.exports = router