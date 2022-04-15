const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    let token;

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // Get Token
            token = authorization.split(' ')[1];
            
            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');
            
            next()
        } catch (err) {
            console.log(err);
            res.status(401);
            throw new Error('User Not Authorized')
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('User Not Authorized. No Token Found')
    }
});
module.exports = { protect }