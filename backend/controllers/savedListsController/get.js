const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/savedShoppingListModel');
const { getLists, getList, getListItems, getListItem } = require('../template_listController/get');

// Get All Saved Shopping Lists

const getSavedLists = asyncHandler(async (req, res) => {
    getLists(req, res, ShoppingList)
});

// Get Saved Shopping List By ID

const getSavedList = asyncHandler(async (req, res) => {
    getList(req, res, ShoppingList)
});

// Get Saved Shopping List Items

const getSavedListItems = asyncHandler(async (req, res) => {
    getListItems(req, res, ShoppingList)
});

// Get Saved Shopping List Item By ID

const getSavedListItem = asyncHandler(async (req, res) => {
    getListItem(req, res, ShoppingList)
});

module.exports = { 
    getSavedLists, 
    getSavedList, 
    getSavedListItems,
    getSavedListItem 
}