const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const ActiveList = require('../../models/activeListModel');
const ShoppingList = require('../../models/shoppingListModel');
const { userVerify } = require('../../middleware/userMiddleware');

// Get User Data

const getUser = asyncHandler(async (req, res) => {
    
    const userLogin = await User.findById(req.params.id);
    if(!userLogin) {
        res.status(400);
        throw new Error('User Not Found')
    }
    console.log(userLogin)
    const activeList = await ActiveList.find({ user: req.user.id })
    const shoppingList = await ShoppingList.find({ user: req.user.id })
    if (shoppingList.user) {
        if (!userVerify(req.user.id, shoppingList[0].user)) {
            res.status(401);
            throw new Error('User Not Authorized')
        }
    }
    
    res.status(200).json({ 
        user: userLogin,
        activeShoppingList: [...activeList ],
        savedShoppingLists: [...shoppingList]
    });
});

module.exports = { getUser }