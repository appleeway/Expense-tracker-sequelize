// app.js
// require modules in this project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// const values
const app = express()
const port = 3000

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

// routes
app.use('/', require('./routes/home.js'))
app.use('/users', require('./routes/user.js'))
app.use('/records', require('./routes/record.js'))


// listening
app.listen(port, () => {
  console.log(`app is listening on port: ${port}`)
})