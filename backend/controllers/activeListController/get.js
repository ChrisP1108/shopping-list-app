const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/activeShoppingListModel');
const { getLists, getList, getListItems, getListItem } = require('../template_listController/get');

// Get All Active Shopping Lists

const getActiveLists = asyncHandler(async (req, res) => {
    getLists(req, res, ShoppingList)
});

// Get Active Shopping List By ID

const getActiveList = asyncHandler(async (req, res) => {
    getList(req, res, ShoppingList)
});

// Get Active Shopping List Items

const getActiveListItems = asyncHandler(async (req, res) => {
    getListItems(req, res, ShoppingList)
});

// Get Active Shopping List Item By ID

const getActiveListItem = asyncHandler(async (req, res) => {
    getListItem(req, res, ShoppingList)
});

module.exports = { 
    getActiveLists, 
    getActiveList, 
    getActiveListItems,
    getActiveListItem 
}