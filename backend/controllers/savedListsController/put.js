const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/savedShoppingList');

// Update Saved Shopping List By ID

const putSavedList = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const shoppingList = await ShoppingList.findById(req.params.id);
    
    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }
    if (!name) {
        res.status(400);
        throw new Error('Shopping List Name Must Be Defined')
    }
    
    shoppingList.name = name

    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList, {new: true});

    let updatedRes = await ShoppingList.findById(req.params.id);
    res.status(200).json(updatedRes); 
});

// Update Saved Shopping List Item By ID

const putSavedListItem = asyncHandler(async (req, res) => {
    const { name, quantity } = req.body;
    
    let shoppingListId = req._parsedUrl.pathname.slice(1);
    shoppingListId = shoppingListId.slice(0, shoppingListId.indexOf('/'));
    const shoppingList = await ShoppingList.findById(shoppingListId);

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if(!req.body || !name || !quantity) {
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
    updatedRes = updatedRes.items.find(item => item.name === name);
    res.status(200).json(updatedRes); 
});

module.exports = { 
    putSavedList, 
    putSavedListItem 
}