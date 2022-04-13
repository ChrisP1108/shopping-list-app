const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');

// Delete Shopping List Or Item By ID

const deleteList = asyncHandler(async (req, res, ShoppingList) => {
    const shoppingList = await ShoppingList.find({ _id: req.params.id });
    
    if (!shoppingList[0]) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user.id, shoppingList[0].user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    await shoppingList[0].remove();
    res.status(200).json({ id: req.params.id });
});

// Delete Shopping List Items

const deleteListItems = asyncHandler(async (req, res, ShoppingList) => {
    const shoppingList = await ShoppingList.find({ _id: req.params.id });

    if (!shoppingList[0]) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user._id, shoppingList[0].user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    shoppingList[0].items = []
    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList[0], {new: true});
    res.status(200).json(updatedShoppingList); 
});

// Delete Shopping List Item By ID

const deleteListItem = asyncHandler(async (req, res, ShoppingList) => {
    let shoppingListId = req._parsedUrl.pathname.slice(1);
    shoppingListId = shoppingListId.slice(0, shoppingListId.indexOf('/'));
    const shoppingList = await ShoppingList.find({ _id: shoppingListId });

    if (!shoppingList[0]) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user.id, shoppingList[0].user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    const shoppingListItem = shoppingList[0].items.find(item => item._id.toString() === req.params.id)

    if (!shoppingListItem._id.toString()) {
        res.status(400);
        throw new Error('Shopping List Item Not Found')
    }

    shoppingList[0].items = shoppingList[0].items.filter(item => item._id.toString() !== shoppingListItem._id.toString());

    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(shoppingListId, shoppingList[0], {new: true});
    res.status(200).json(shoppingListItem); 
});

module.exports = { 
    deleteList, 
    deleteListItems, 
    deleteListItem 
}