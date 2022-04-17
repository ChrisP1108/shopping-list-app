const express = require('express');
const router = express.Router();

const { getUser } = require('../controllers/userController/get');
const { postUserRegister, postUserLogin, postUserRecoveryInit } = require('../controllers/userController/post');
const { putUserUpdate, putUserRecoveryComplete } = require('../controllers/userController/put');
const { deleteUser } = require('../controllers/userController/delete');
const { protect } = require('../middleware/authMiddleware');

router.get('/user', protect, getUser); // Get User Data

router.post('/register', postUserRegister); // Register New User

router.post('/login', postUserLogin); // User Login

router.post('/recover', postUserRecoveryInit); // Initialize Recover User Login Getting ID And Question To Recover Credentials

router.put('/:id', protect, putUserUpdate); // Update User Credentials

router.put('/recover/:id', putUserRecoveryComplete) // Finish Recover User Login Providing ID, Answer And Setting New Password

router.delete('/:id', protect, deleteUser); // Delete User

module.exports = router