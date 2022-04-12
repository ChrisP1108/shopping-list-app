const asyncHandler = require('express-async-handler');
const Root = require('../../models/savedShoppingList');

// Get User Information

const getUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    
    if (!username) {
        res.status(400);
        throw new Error('A Username Must Be Provided')
    }
    if (!password) {
        res.status(400);
        throw new Error('A Password Must Be Provided')
    }
    const userLogin = await Root.find({
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

module.exports = { getUser }