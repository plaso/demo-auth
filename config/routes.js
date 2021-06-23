const router = require('express').Router();
const usersController = require('../controllers/users.controller');

router.get('/', usersController.index);
router.get('/new', usersController.new);

module.exports = router;