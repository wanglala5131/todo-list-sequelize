const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const Todo = db.Todo


router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/new', (req, res) => {
  const { name } = req.body
  const UserId = req.user.id
  Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const UserId = req.user.id
  const { name, isDone } = req.body
  const { id } = req.params
  Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
router.delete('/:id', (req, res) => {
  const UserId = req.user.id
  const { id } = req.params
  Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      return todo.destroy()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})



module.exports = router