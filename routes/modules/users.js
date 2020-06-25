const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User
const Todo = db.Todo

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } }).then(user => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []  //放入訊息的陣列
    //如果有欄位沒被填就會被push進error
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: 'You have to finish all space' })
    }
    //如果兩組密碼不相同，就會被push進error
    if (password !== confirmPassword) {
      errors.push({ message: 'Password and comfirm password are different' })
    }
    //只要error有長度(即有東西)，就會先render註冊頁
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    if (user) {
      errors.push({ message: 'This email already exists' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have successfully logged out')
  res.redirect('/users/login')
})

module.exports = router