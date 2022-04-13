const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/savedShoppingListModel');
const { deleteList, deleteListItems, deleteListItem } = require('../template_listController/delete');

// Delete Saved Shopping List Or Item By ID

const deleteSavedList = asyncHandler(async (req, res) => {
    deleteList(req, res, ShoppingList)
});

// Delete Saved Shopping List Items

const deleteSavedListItems = asyncHandler(async (req, res) => {
    deleteListItems(req, res, ShoppingList)
});

// Delete Saved Shopping List Item By ID

const deleteSavedListItem = asyncHandler(async (req, res) => {
    deleteListItem(req, res, ShoppingList)
});

module.exports = { 
    deleteSavedList, 
    deleteSavedListItems, 
    deleteSavedListItem 
}