const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');

// Get All Shopping Lists

const getLists = asyncHandler(async (req, res, ShoppingList) => {
    const shoppingList = await ShoppingList.find({ user: req.user.id });
    res.status(200).json(shoppingList);
});

// Get Shopping List By ID

const getList = asyncHandler(async (req, res, ShoppingList) => {
    const shoppingList = await ShoppingList.find({ _id: req.params.id });
    if (!shoppingList[0]) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }
    if (!userVerify(req.user.id, shoppingList[0].user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    res.status(200).json(shoppingList[0]);
});

// Get Shopping List Items

const getListItems = asyncHandler(async (req, res, ShoppingList) => {
    const shoppingList = await ShoppingList.find({ _id: req.params.id });

    if (!shoppingList[0]) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user.id, shoppingList[0].user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    res.status(200).json(shoppingList[0].items);
});

// Get Shopping List Item By ID

const getListItem = asyncHandler(async (req, res, ShoppingList) => {
    let shoppingListId = req._parsedUrl.pathname.slice(1);
    shoppingListId = shoppingListId.slice(0, shoppingListId.indexOf('/'));
    const shoppingList = await ShoppingList.find({ _id: shoppingListId });

    if (!shoppingList[0]) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user.id, shoppingList[0].user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    const shoppingListItem = shoppingList[0].items.find(item => item._id.toString() === req.params.id);

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