const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', usersController.index);
router.get('/register', authMiddleware.isNotAuthenticated, usersController.register);
router.post('/register', authMiddleware.isNotAuthenticated, usersController.doRegister);
router.get('/login', authMiddleware.isNotAuthenticated, usersController.login);
router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin);
router.get('/profile', authMiddleware.isAuthenticated, usersController.profile);
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout);

module.exports = router;