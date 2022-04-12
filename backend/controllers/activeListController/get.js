const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/activeShoppingList');

// Get All Active Shopping Lists

const getActiveLists = asyncHandler(async (req, res) => {
    const shoppingList = await ShoppingList.find();
    res.status(200).json(shoppingList);
});

// Get Active Shopping List By ID

const getActiveList = asyncHandler(async (req, res) => {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }
    res.status(200).json(shoppingList);
});

// Get Active Shopping List Items

const getActiveListItems = asyncHandler(async (req, res) => {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }
    res.status(200).json(shoppingList.items);
});

// Get Active Shopping List Item By ID

const getActiveListItem = asyncHandler(async (req, res) => {
    let shoppingListId = req._parsedUrl.pathname.slice(1);
    shoppingListId = shoppingListId.slice(0, shoppingListId.indexOf('/'));
    const shoppingList = await ShoppingList.findById(shoppingListId);

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    const shoppingListItem = shoppingList.items.find(item => item._id.toString() === req.params.id);

    if (!shoppingListItem) {
        res.status(400);
        throw new Error('Shopping List Item Not Found')
    }

    res.status(200).json(shoppingListItem);
});

module.exports = { 
    getActiveLists, 
    getActiveList, 
    getActiveListItems,
    getActiveListItem 
}