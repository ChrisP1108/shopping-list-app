const asyncHandler = require('express-async-handler');
const Root = require('../../models/root');

const postUserRegister = asyncHandler(async (req, res) => {
    if (!req.body.username) {
        res.status(400);
        throw new Error('A Username Must Be Provided To Register User')
    }
    if(req.body.username.includes(' ') 
        || req.body.username.length > 15 || req.body.username.length < 8) {
            res.status(400);
            throw new Error('Username Cannot Have Spaces Or Be Less Than 8 Or Greater Than 15 Characters')
    }
    if (!req.body.password) {
        res.status(400);
        throw new Error('A Password Must Be Provided To Register User')
    }
    if (req.body.password.includes(' ') 
        || req.body.password.length > 15 || req.body.password.length < 8) {
            res.status(400);
            throw new Error('Password Cannot Have Spaces Or Be Less Than 8 Or Greater Than 15 Characters')
    }
    const userCreate = await Root.create({
        user: {
            username: req.body.username,
            password: req.body.password
        },
        activeList: [],
        savedLists: []
    });
    res.status(200).json(userCreate);
});

const postUserLogin = asyncHandler(async (req, res) => {
    if (!req.body.username) {
        res.status(400);
        throw new Error('A Username Must Be Provided To Login')
    }
    if (!req.body.password) {
        res.status(400);
        throw new Error('A Password Must Be Provided To Login')
    }
    const userLogin = await Root.find({
        user: {
            username: req.body.username,
            password: req.body.password
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