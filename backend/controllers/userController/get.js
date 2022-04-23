const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const ActiveList = require('../../models/activeListModel');
const ShoppingList = require('../../models/shoppingListModel');
const { userVerify } = require('../../middleware/userMiddleware');

// Get User Data

const getUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(400);
        throw new Error('User Not Found. User May Have Been Deleted Or Possible Bad Token')
    }
    const userLogin = await User.findById(req.user.id);

    userLogin.user = userLogin._id;

    if (!userVerify(req.user, userLogin)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    if (!userLogin) {
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

    res.status(200).json({ 
        user: {
            _id: userLogin._id,
            username: userLogin.username,
            firstName: userLogin.firstName,
            email: userLogin.email,
            settings: {
                themeColor: userLogin.settings.themeColor,
                sortBy: userLogin.settings.sortBy,
                showChecked: userLogin.settings.showChecked
            }
        },
        activeShoppingList: activeList[0],
        savedShoppingLists: [...shoppingList]
    });
});

module.exports = { getUser }