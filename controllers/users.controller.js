const User = require('../models/User.model');

module.exports.index = (req, res, next) => {
  User.find()
    .then(users => {
      res.render('index', {users});
    })
}

module.exports.new = (req, res, next) => {
  res.render('new');
}

module.exports.create = (req, res, next) => {
  User.create(req.body)
    .then(() => {
      res.redirect('/')
    })
}