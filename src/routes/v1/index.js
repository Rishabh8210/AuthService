const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers/index');
const User = new UserController();
console.log(User.createUser)
router.post('/signup', User.createUser);

module.exports = router