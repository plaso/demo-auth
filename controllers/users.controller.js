const mongoose = require('mongoose')
const User = require('../models/User.model');

module.exports.index = (req, res, next) => {
  console.log(req.session)
  User.find()
    .then(users => {
      res.render('index', {users});
    })
}

module.exports.register = (req, res, next) => {
  res.render('register');
}

module.exports.doRegister = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        User.create(req.body)
          .then(() => {
            res.redirect('/')
          })
          .catch((e) => {
            if (e instanceof mongoose.Error.ValidationError) {
              res.render('register', { user: req.body, errors: e.errors })
            } else {
              next(e)
            }
          })
      } else {
        res.render('register', { user: req.body, errors: { email: "There is already an user with this email" } })
      }
    })
    .catch(e => next(e))
}

module.exports.login = (req, res, next) => {
  res.render("login")
}

module.exports.doLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.render('login', { errorMessage: 'Email or password incorrect', user: {
          email: req.body.email
        }})
      } else {
        return user.checkPassword(req.body.password)
          .then(match => {
            if (match) {
              console.log('hello???')
              req.session.currentUser = user;
              res.redirect('/')
            } else {
              res.render('login', { errorMessage: 'Email or password incorrect', user: {
                email: req.body.email
              }})
            }
          })
      }
    })
    .catch(e => next(e))
}