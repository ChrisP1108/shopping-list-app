const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/savedShoppingListModel');
const { putList, putListItem } = require('../template_listController/put');

// Update Saved Shopping List By ID

const putSavedList = asyncHandler(async (req, res) => {
    putList(req, res, ShoppingList)
});

// Update Saved Shopping List Item By ID

const putSavedListItem = asyncHandler(async (req, res) => {
    putListItem(req, res, ShoppingList)
});

module.exports = { 
    putSavedList, 
    putSavedListItem 
}