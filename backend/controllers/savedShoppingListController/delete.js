const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ShoppingList = require('../../models/shoppingListModel');
const ActiveList = require('../../models/activeListModel');

// Delete Shopping List Or Item By ID

const deleteList = asyncHandler(async (req, res) => {
    let shoppingList = await ShoppingList.find({ _id: req.params.id });
    shoppingList = shoppingList[0];

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user.id, shoppingList.user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    await shoppingList.remove();
    res.status(200).json({ id: req.params.id });
});

// Delete Shopping List Items

const deleteListItems = asyncHandler(async (req, res) => {
    let shoppingList = await ShoppingList.find({ _id: req.params.id });
    shoppingList = shoppingList[0];

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user._id, shoppingList.user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    shoppingList.items = []
    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList, {new: true});
    res.status(200).json(updatedShoppingList); 
});

// Delete Shopping List Item By ID

const deleteListItem = asyncHandler(async (req, res, ShoppingList) => {
    const shoppingListId = req._parsedUrl.pathname.split('/')[1];
    let shoppingList = await ShoppingList.find({ _id: shoppingListId });
    shoppingList = shoppingList[0]

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user.id, shoppingList.user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    const shoppingListItem = shoppingList.items.find(item => item._id.toString() === req.params.id)

    if (!shoppingListItem._id.toString()) {
        res.status(400);
        throw new Error('Shopping List Item Not Found')
    }

    shoppingList.items = shoppingList.items.filter(item => item._id.toString() !== shoppingListItem._id.toString());

    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(shoppingListId, shoppingList, {new: true});
    res.status(200).json(shoppingListItem); 
});

module.exports = { 
    deleteList, 
    deleteListItems, 
    deleteListItem 
}