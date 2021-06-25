const User = require('../models/User.model');

module.exports.index = (req, res, next) => {
  User.find()
    .then(users => {
      res.render('index', {users});
    })
}

module.exports.register = (req, res, next) => {
  res.render('register');
}

module.exports.doRegister = (req, res, next) => {
  User.create(req.body)
    .then(() => {
      res.redirect('/')
    })
}