// routes/record.js
const express = require('express')
const router = express.Router()

//建立路由
//瀏覽所有 record
router.get('/', (req, res) => {
  res.send('瀏覽所有 record')
})

//新增一筆 record 頁面
router.get('/new', (req, res) => {
  res.send('新增一筆 record 頁面')
})

//新增一筆 record
router.post('/new', (req, res) => {
  res.send('新增一筆 record')
})

//編輯一筆 record 頁面
router.get('/:id/edit', (req, res) => {
  res.send('編輯一筆 record 頁面')
})

//編輯一筆 record
router.put('/:id', (req, res) => {
  res.send('編輯一筆 record')
})

//刪除一筆 record
router.delete('/:id', (req, res) => {
  res.send('刪除一筆 record')
})

module.exports = router