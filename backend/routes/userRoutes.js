const express = require('express');
const router = express.Router();
const { postUserRegister, postUserLogin } = require('../controllers/userController/post');
const { getUser } = require('../controllers/userController/get');
const { protect } = require('../middleware/authMiddleware');

router.post('/', postUserRegister);

router.post('/login', postUserLogin)

router.get('/user', protect, getUser)

module.exports = router