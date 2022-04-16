const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/userController/get');
const { postUserRegister, postUserLogin } = require('../controllers/userController/post');
const { deleteUser } = require('../controllers/userController/delete');
const { protect } = require('../middleware/authMiddleware');

router.get('/user', protect, getUser)

router.post('/register', postUserRegister);

router.post('/login', postUserLogin)

router.delete('/:id', protect, deleteUser)

module.exports = router