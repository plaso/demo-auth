const router = require('express').Router();
const usersController = require('../controllers/users.controller');

router.get('/', usersController.index);
router.get('/register', usersController.register);
router.post('/register', usersController.doRegister);

module.exports = router;