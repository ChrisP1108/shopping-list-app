const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const ActiveList = require('../../models/activeListModel');
const ShoppingList = require('../../models/shoppingListModel');
const { userVerify } = require('../../middleware/userMiddleware');

// Get User Data

const getUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(400);
        throw new Error('User Not Found. Possible Bad Token')
    }
    const userLogin = await User.findById(req.user._id);

    if(!userLogin) {
        res.status(400);
        throw new Error('User Not Found')
    }

    userLogin.user = userLogin._id

    if (!userVerify(req.user, userLogin)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    const activeList = await ActiveList.find({ user: req.user.id })
    const shoppingList = await ShoppingList.find({ user: req.user.id })
    if (shoppingList.user) {
        if (!userVerify(req.user, shoppingList[0])) {
            res.status(401);
            throw new Error('User Not Authorized')
        }
    }
    userLogin.password = "Protected";
    userLogin.recovery.pin = "Protected";
    userLogin.recovery.answer = "Protected"; 

    res.status(200).json({ 
        user: userLogin,
        activeShoppingList: [...activeList ],
        savedShoppingLists: [...shoppingList]
    });
});

module.exports = { getUser }