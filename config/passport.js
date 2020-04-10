// config/passport.js
const LocalStrategy = require('passport-local').Strategy

//載入 model
const db = require('../models')
const User = db.User

// strategy
module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ where: { email: email } }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That emil is not register.' })
        }
        if (user.password != password) {
          console.log('User password is not correct.')
          return done(null, false, { message: 'Email or password incorrect.' })
        }
        return done(null, user)
      })
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      user = user.get()
      done(null, user)
    })
  })


}