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
  res.send('瀏覽所有 record')
})

//新增一筆 record 頁面
router.get('/new', authenticated, (req, res) => {
  res.send('新增一筆 record 頁面')
})

//新增一筆 record
router.post('/new', authenticated, (req, res) => {
  res.send('新增一筆 record')
})

//編輯一筆 record 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  res.send('編輯一筆 record 頁面')
})

//編輯一筆 record
router.put('/:id', authenticated, (req, res) => {
  res.send('編輯一筆 record')
})

//刪除一筆 record
router.delete('/:id', authenticated, (req, res) => {
  res.send('刪除一筆 record')
})

module.exports = router