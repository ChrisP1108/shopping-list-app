const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/activeShoppingListModel');
const { putList, putListItem } = require('../template_listController/put');

// Update Active Shopping List By ID

const putActiveList = asyncHandler(async (req, res) => {
    putList(req, res, ShoppingList)
});

// Update Active Shopping List Item By ID

const putActiveListItem = asyncHandler(async (req, res) => {
    putListItem(req, res, ShoppingList)
});

module.exports = { 
    putActiveList, 
    putActiveListItem 
}