// routes/home.js
const express = require('express')
const router = express.Router()

//載入 database
const db = require('../models')
const User = db.User
const Record = db.Record

// 載入 auth middleware
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  res.render('index')
})

module.exports = router