const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers/index');
const { AuthMiddlewareValidator } = require('../../middlewares/index');
const User = new UserController();
router.post('/signup', AuthMiddlewareValidator.validateUserSignupAuth, User.createUser);
router.post('/signin', AuthMiddlewareValidator.validateUserSigninAuth,  User.signin);
router.get('/isAuthenticated', User.isAuthenticated)
router.get('/users/:id', User.getUserById);
module.exports = router