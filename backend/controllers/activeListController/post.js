const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/activeShoppingListModel');
const { postList, postListItem } = require('../template_listController/post');

// Add Active Shopping List

const postActiveList = asyncHandler(async (req, res) => {
    postList(req, res, ShoppingList, false)
});

// Add Active Shopping List Item

const postActiveListItem = asyncHandler(async (req, res) => {
    postListItem(req, res, ShoppingList)
});

module.exports = { 
    postActiveList, 
    postActiveListItem 
}