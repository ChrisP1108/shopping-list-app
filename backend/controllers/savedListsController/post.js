const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/savedShoppingListModel');
const { postList, postListItem } = require('../template_listController/post');

// Add Saved Shopping List

const postSavedList = asyncHandler(async (req, res) => {
    postList(req, res, ShoppingList, true)
});

// Add Saved Shopping List Item

const postSavedListItem = asyncHandler(async (req, res) => {
    postListItem(req, res, ShoppingList)
});

module.exports = { 
    postSavedList, 
    postSavedListItem 
}