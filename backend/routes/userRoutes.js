const express = require('express');
const router = express.Router();
const { postUserRegister, postUserLogin } = require('../controllers/userController/post');
const { getUser } = require('../controllers/userController/get')

router.post('/register', postUserRegister);

router.post('/login', postUserLogin)

router.get('/user', getUser)

module.exports = router