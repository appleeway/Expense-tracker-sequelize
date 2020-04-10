// routes/record.js
const express = require('express')
const router = express.Router()

//載入 database
const db = require('../models')
const User = db.User
const Record = db.Record

// 載入 auth middleware
const { authenticated } = require('../config/auth')

//建立路由
//瀏覽所有 record
router.get('/', authenticated, (req, res) => {
  res.redirect('/')
})

//新增一筆 record 頁面
router.get('/new', authenticated, (req, res) => {
  res.render('newedit')
})

//新增一筆 record
router.post('/new', authenticated, (req, res) => {
  const { name, date, amount, category } = req.body
  Record.create({
    name,
    date,
    amount,
    category,
    UserId: req.user.id
  })
    .then((record) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

//編輯一筆 record 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      return Record.findOne({
        where: {
          Id: req.params.id,
          UserId: req.user.id
        }
      })
    })
    .then((record) => { return res.render('newedit', { record: record.get(), action: '修改' }) })
})

//編輯一筆 record
router.put('/:id', authenticated, (req, res) => {
  const { name, date, amount, category } = req.body
  Record.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id
    }
  })
    .then((record) => {
      record.name = name
      record.date = date
      record.amount = amount
      record.category = category

      return record.save()
    })
    .then((record) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

//刪除一筆 record
router.delete('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')

      return Record.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((record) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router