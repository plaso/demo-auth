const router = require('express').Router();
const usersController = require('../controllers/users.controller');

router.get('/', usersController.index);
router.get('/register', usersController.register);
router.post('/register', usersController.doRegister);
router.get('/login', usersController.login);
router.post('/login', usersController.doLogin);

module.exports = router;