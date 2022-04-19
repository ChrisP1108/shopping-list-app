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

router.post('/recover', postUserRecoveryInit); // User Login Credentials Recovery Initialization

router.put('/:id', protect, putUserUpdate); // Update User Credentials

router.put('/recover/:id', putUserRecoveryComplete) // Finish Recovery Of Login Credentials From Provided User ID And Question

router.delete('/:id', protect, deleteUser); // Delete User

module.exports = router