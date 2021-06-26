const mongoose = require('mongoose');
const User = require('../models/User.model');

module.exports.index = (req, res, next) => {
  console.log(req.session)
  User.find()
    .then(users => {
      res.render('index', {users});
    })
    .catch((e) => next(e))
}

module.exports.register = (req, res, next) => {
  res.render('register');
}

module.exports.doRegister = (req, res, next) => {
  User.create(req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        res.render('register', {
          errors: e.errors,
          user: {
            email: req.body.email
          }
        })
      } else if (e.code === 11000) {
        res.render('register', {
          errors: { email: 'There is already an account registered with this email' },
          user: {
            email: req.body.email
          }
        })
      } else {
        next(e)
      }
    })
}

module.exports.login = (req, res, next) => {
  res.render('login')
}

module.exports.doLogin = (req, res, next) => {
  // find by one usando el email
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.render('login', {
          errorMessage: 'Email or password are invalid',
          user: {
            email: req.body.email
          }
        })
      } else {
        // comprobar la contraseña
        return user.checkPassword(req.body.password)
          .then((match) => {
            if (match) {
              req.session.currentUser = user
              res.redirect('/profile')
            } else {
              res.render('login', {
                errorMessage: 'Email or password are invalid',
                user: {
                  email: req.body.email
                }
              })
            }
          })
      }
    })
    .catch(e => next(e))
}

module.exports.profile = (req, res, next) => {
  res.render('profile')
}

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
}