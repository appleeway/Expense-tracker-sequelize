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
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error("user not found")
      return Record.findAll({
        raw: true,
        nest: true,
        where: { UserId: req.user.id }
      })
    })
    .then((records) => {
      let totalAmount = 0
      for (i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      return res.render('index', { records: records, totalAmount })
    })
    .catch((error) => { return res.status(422).json(error) })

})

module.exports = router