const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/shoppingList');

// Get All Saved Shopping Lists

const getSavedLists = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: 'Get Saved Shopping Lists'})
});

// Get Saved Shopping List By ID

const getSavedList = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: `Get Saved Shopping List ${req.params.id}`})
});

module.exports = { getSavedLists, getSavedList }