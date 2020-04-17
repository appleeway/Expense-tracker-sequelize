// routes/home.js
const express = require('express')
const router = express.Router()
const { Op } = require('sequelize')

//載入 database
const db = require('../models')
const User = db.User
const Record = db.Record

// 載入 auth middleware
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  const months = ['-01-', '-02-', '-03-', '-04-', '-05-', '-06-', '-07-', '-08-', '-09-', '-10-', '-11-', '-12-']
  const month = req.query.month || ''
  const category = req.query.category || ''
  const startDate = `2020-${month}-01`
  const endDate = `2020-${month + 1}-01`

  console.log(month)
  console.log(category)

  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error("user not found")
      return Record.findAll({
        raw: true,
        nest: true,
        where: {
          UserId: req.user.id,
          category: { [Op.substring]: category },
          date: { [Op.substring]: month }
        }
      })
    })
    .then((records) => {
      let totalAmount = 0
      for (i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      return res.render('index', { records, totalAmount, category, months, month })
    })
    .catch((error) => { return res.status(422).json(error) })

})

module.exports = router