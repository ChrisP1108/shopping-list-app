const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/activeShoppingListModel');
const { deleteList, deleteListItems, deleteListItem } = require('../template_listController/delete');

// Delete Active Shopping List Or Item By ID

const deleteActiveList = asyncHandler(async (req, res) => {
    deleteList(req, res, ShoppingList)
});

// Delete Active Shopping List Items

const deleteActiveListItems = asyncHandler(async (req, res) => {
    deleteListItems(req, res, ShoppingList)
});

// Delete Active Shopping List Item By ID

const deleteActiveListItem = asyncHandler(async (req, res) => {
    deleteListItem(req, res, ShoppingList)
});

module.exports = { 
    deleteActiveList, 
    deleteActiveListItems, 
    deleteActiveListItem 
}