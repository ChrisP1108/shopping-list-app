const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/shoppingList');

// Get All Active Shopping Lists

const getActiveLists = asyncHandler(async (req, res) => {
    const shoppingList = await ShoppingList.find()
    res.status(200).json(shoppingList)
});

// Get Active Shopping List By ID

const getActiveList = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: `Get Active Shopping List ${req.params.id}`})
});

module.exports = { getActiveLists, getActiveList }