const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/shoppingList');

// Update Active Shopping List By ID

const putActiveList = asyncHandler(async (req, res) => {
    const shoppingList = await ShoppingList.findById(req.params.id);
    
    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }
    if (!req.body.name) {
        res.status(400);
        throw new Error('Shopping List Name Must Be Defined')
    }
    
    shoppingList.name = req.body.name

    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList, {new: true});

    let updatedRes = await ShoppingList.findById(req.params.id);
    res.status(200).json(updatedRes); 
});

// Update Active Shopping List Item By ID

const putActiveListItem = asyncHandler(async (req, res) => {
    let shoppingListId = req._parsedUrl.pathname.slice(1);
    shoppingListId = shoppingListId.slice(0, shoppingListId.indexOf('/'));
    const shoppingList = await ShoppingList.findById(shoppingListId);

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if(!req.body || !req.body.name || !req.body.quantity) {
        res.status(400);
        throw new Error('Shopping List Item Must Have A Name And Quantity To Update')
    }

    const shoppingListItem = shoppingList.items.find(item => item._id.toString() === req.params.id)

    if (!shoppingListItem) {
        res.status(400);
        throw new Error('Shopping List Item Not Found')
    }

    shoppingList.items = shoppingList.items.map(item => 
        item._id.toString() === shoppingListItem._id.toString() ? req.body : item);

    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(shoppingListId, shoppingList, {new: true});

    let updatedRes = await ShoppingList.findById(shoppingListId);
    updatedRes = updatedRes.items.find(item => item.name === req.body.name);
    res.status(200).json(updatedRes); 
});

module.exports = { 
    putActiveList, 
    putActiveListItem 
}