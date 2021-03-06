const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const User = require('../../models/userModel');
const ActiveList = require('../../models/activeListModel');
const ShoppingList = require('../../models/shoppingListModel');

// Delete User

const deleteUser = asyncHandler(async (req, res) => {    
    if (!req.user) {
        res.status(400);
        throw new Error('User Not Found. Possible Bad Token')
    }
    
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
        await activeList[0].remove();
    }
    if (userLogin) {
        await userLogin.remove();
    }
    if (shoppingList.length) {
        shoppingList.forEach(async (item) => await item.remove());
    }
    const userRemoved = await User.findById(req.params.id);
    const activeListRemoved = await ActiveList.find({ user: req.user.id });
    const shoppingListsRemoved = await ShoppingList.find({ user: req.user.id });
    if (!userRemoved && !activeListRemoved.length && !shoppingListsRemoved.length) {
        res.status(200).json({ id: req.params.id })
    } else {
        res.status(500);
        throw new Error('Failed To Remove User')
    }
});

module.exports = { deleteUser }