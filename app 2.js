// app.js
// require modules in this project
const express = require('express')
const exphbs = require('express-handlebars')
require('./handlebars_helper')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

// const values
const app = express()
const port = 3000

//判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// set database
const db = require('./models')
const Record = db.Record
const User = db.User

// set view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set body-parser & method-override
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//使用 connect-flash
app.use(flash())

// set express-session
app.use(session({
  secret: 'hotcat',
  resave: 'false',
  saveUninitialized: 'false',
}))
app.use(passport.initialize())
app.use(passport.session())

// 使用 Passport - 要在「routes」前面
require('./config/passport')(passport)

//建立 local variables
app.use((req, res, next) => {
  res.locals.user = req.user
  //辨識使用者是否已經登入的變數，讓 view 可以使用
  res.locals.isAuthenticated = req.isAuthenticated()
  //兩個 flash message 變數
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// routes
app.use('/', require('./routes/home.js'))
app.use('/users', require('./routes/user.js'))
app.use('/records', require('./routes/record.js'))
app.use('/auth', require('./routes/auths'))


// listening
app.listen(port, () => {
  console.log(`app is listening on port: ${port}`)
})