const express = require('express');
const router = express.Router();
const { postUserRegister, postUserLogin } = require('../controllers/userController/post');
const { getUser } = require('../controllers/userController/get');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', postUserRegister);

router.post('/login', postUserLogin)

router.get('/:id', protect, getUser)

module.exports = router