const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const User = require('../../models/userModel');
const ActiveList = require('../../models/activeListModel');
const ShoppingList = require('../../models/shoppingListModel');

// Clear Active Shopping List Item

const deleteUser = asyncHandler(async (req, res) => {    
    const userLogin = await User.findById(req.params.id);
    const activeList = await ActiveList.find({ user: req.user.id })
    const shoppingList = await ShoppingList.find({ user: req.user.id })
    
    if (!userLogin) {
        res.status(400);
        throw new Error('User Not Found')
    }
    userLogin.user = userLogin._id;

    if (!userVerify(req.user, userLogin)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }
    if (activeList.length) {
        await activeList.remove();
    }
    if (userLogin) {
        await userLogin.remove();
    }
    if (shoppingList.length) {
        await shoppingList.remove();
    }
    const userRemoved = await User.findById(req.params.id);
    if (userRemoved || activeList.length || shoppingList.length) {
        res.status(400);
        throw new Error('Failed To Remove User')
    } else res.status(200).json({ id: req.params.id });
});

module.exports = { deleteUser }