const express = require('express')
const router = express.Router()


router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', (req, res) => {
  res.send('login-p')
})
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  res.send('register-p')
})
router.get('/logout', (req, res) => {
  res.redirect('/users/login')
})

module.exports = router