const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../../models/user');

// Register New User

const postUserRegister = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        res.status(400);
        throw new Error('A Username Must Be Provided To Register User')
    }
    if(username.includes(' ') 
        || username.length > 15 || username.length < 8) {
            res.status(400);
            throw new Error('Username Cannot Have Spaces Or Be Less Than 8 Or Greater Than 15 Characters')
    }
    if (!password) {
        res.status(400);
        throw new Error('A Password Must Be Provided To Register User')
    }
    if (password.includes(' ') 
        || password.length > 15 || password.length < 8) {
            res.status(400);
            throw new Error('Password Cannot Have Spaces Or Be Less Than 8 Or Greater Than 15 Characters')
    }

    const userExists = await User.findOne({username})
    if (userExists) {
        res.status(400);
        throw new Error('A User With The Same Username Already Exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const userCreate = await User.create({
        username: username,
        password: hashedPassword
    });

    if (userCreate) {
        res.status(201).json({
            _id: userCreate.id,
            username: userCreate.user.username
        });
    } else {
        res.status(400);
        throw new Error('Error Occured When Registering User')
    }
    
});

// User Login

const postUserLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        res.status(400);
        throw new Error('A Username Must Be Provided To Login')
    }
    if (!password) {
        res.status(400);
        throw new Error('A Password Must Be Provided To Login')
    }
    const userLogin = await User.find({
        user: {
            username: username,
            password: password
        }
    });

    if(!userLogin.length) {
        res.status(400);
        throw new Error('User Not Found')
    }
    res.status(200).json(userLogin);
});

module.exports = {
    postUserRegister,
    postUserLogin
}