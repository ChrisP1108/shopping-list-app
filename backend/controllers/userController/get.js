const asyncHandler = require('express-async-handler');
const Root = require('../../models/root');

const getUser = asyncHandler(async (req, res) => {
    if (!req.body.username) {
        res.status(400);
        throw new Error('A Username Must Be Provided')
    }
    if (!req.body.password) {
        res.status(400);
        throw new Error('A Password Must Be Provided')
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

module.exports = { getUser }