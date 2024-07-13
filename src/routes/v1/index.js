const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers/index');
const User = new UserController();
router.post('/signup', User.createUser);
router.post('/signin', User.signin);
module.exports = router