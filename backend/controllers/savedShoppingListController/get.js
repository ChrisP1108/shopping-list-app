const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ShoppingList = require('../../models/shoppingListModel');

// Get All Shopping Lists

const getLists = asyncHandler(async (req, res) => {
    const shoppingList = await ShoppingList.find({ user: req.user.id });
    res.status(200).json(shoppingList);
});

// Get Shopping List By ID

const getList = asyncHandler(async (req, res) => {
    let shoppingList = await ShoppingList.find({ _id: req.params.id });
    shoppingList = shoppingList[0];
    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }
    if (!userVerify(req.user, shoppingList)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    res.status(200).json(shoppingList);
});

// Get Shopping List Items

const getListItems = asyncHandler(async (req, res) => {
    let shoppingList = await ShoppingList.find({ _id: req.params.id });
    shoppingList = shoppingList[0];

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user, shoppingList)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    res.status(200).json(shoppingList.items);
});

// Get Shopping List Item By ID

const getListItem = asyncHandler(async (req, res) => {
    const shoppingListId = req._parsedUrl.pathname.split('/')[1];
    let shoppingList = await ShoppingList.find({ _id: shoppingListId });
    shoppingList = shoppingList[0];

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user, shoppingList)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    const shoppingListItem = shoppingList.items.find(item => item._id.toString() === req.params.id);

    if (!shoppingListItem) {
        res.status(400);
        throw new Error('Shopping List Item Not Found')
    }

    res.status(200).json(shoppingListItem);
});

module.exports = { 
    getLists, 
    getList, 
    getListItems,
    getListItem 
}