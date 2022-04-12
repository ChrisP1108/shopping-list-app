const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/savedShoppingListModel');

// Delete Saved Shopping List Or Item By ID

const deleteSavedList = asyncHandler(async (req, res) => {
    const shoppingList = await ShoppingList.find({ 
        _id: req.params.id,
        user: req.user._id
    });
    if(!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }
    await shoppingList.remove();
    res.status(200).json({ id: req.params.id });
});

// Delete Saved Shopping List Items

const deleteSavedListItems = asyncHandler(async (req, res) => {
    const shoppingList = await ShoppingList.find({ 
        _id: req.params.id,
        user: req.user._id
    });

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }
    shoppingList.items = []
    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList, {new: true});
    res.status(200).json(updatedShoppingList); 
});

// Delete Saved Shopping List Item By ID

const deleteSavedListItem = asyncHandler(async (req, res) => {
    let shoppingListId = req._parsedUrl.pathname.slice(1);
    shoppingListId = shoppingListId.slice(0, shoppingListId.indexOf('/'));
    const shoppingList = await ShoppingList.find({ 
        _id: shoppingListId,
        user: req.user._id
    });

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    const shoppingListItem = shoppingList.items.find(item => item._id.toString() === req.params.id)

    if (!shoppingListItem._id.toString()) {
        res.status(400);
        throw new Error('Shopping List Item Not Found')
    }

    shoppingList.items = shoppingList.items.filter(item => item._id.toString() !== shoppingListItem._id.toString());

    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(shoppingListId, shoppingList, {new: true});
    res.status(200).json(shoppingListItem); 
});

module.exports = { 
    deleteSavedList, 
    deleteSavedListItems, 
    deleteSavedListItem 
}