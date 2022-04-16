const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ShoppingList = require('../../models/shoppingListModel');
const ActiveList = require('../../models/activeListModel');
const User = require('../../models/userModel');

// Set Active Shopping List

const postActiveList = asyncHandler(async (req, res) => {
    const { user, activeShoppingList } = req.body;

    const activeList = await ActiveList.find();
    const shoppingList = await ShoppingList.findById(activeShoppingList);
    const userId = await User.findById(user);

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List ID Not Valid')
    }

    if (!userVerify(req.user, shoppingList)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    if (!userId) {
        res.status(400);
        throw new Error('User ID Not Valid')
    }

    const output = {
        user: userId._id, 
        activeShoppingList: shoppingList._id 
    }

    let activeListCreate;

    if (!activeList.length) {
        activeListCreate = await ActiveList.create(output);
        res.status(200).json(activeListCreate)
    } else {
        activeListCreate = await ActiveList
            .findByIdAndUpdate(activeList._id, output, { new: true });
        const outputList = await ActiveList.find();
        res.status(200).json(outputList)
    }
});

module.exports = { postActiveList }