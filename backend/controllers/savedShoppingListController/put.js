const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ShoppingList = require('../../models/shoppingListModel');

// Update Shopping List By ID

const putList = asyncHandler(async (req, res) => {
    const { name } = req.body
    let shoppingList = await ShoppingList.find({ _id: req.params.id });
    
    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user.id, shoppingList.user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }
    if (!name) {
        res.status(400);
        throw new Error('Shopping List Name Must Be Defined')
    }

    shoppingList.name = name;

    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList, {new: true});

    let updatedRes = await ShoppingList.findById(req.params.id);
    res.status(200).json(updatedRes); 
});

// Update Shopping List Item By ID

const putListItem = asyncHandler(async (req, res) => {
    const { name, quantity } = req.body
    
    const shoppingListId = req._parsedUrl.pathname.split('/')[1];
    let shoppingList = await ShoppingList.find({ _id: shoppingListId });
    shoppingList = shoppingList[0];

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user.id, shoppingList.user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    if(!req.body || !name || !quantity) {
        res.status(400);
        throw new Error('Shopping List Item Must Have A Name And Quantity To Update')
    }

    const shoppingListItem = shoppingList.items.find(item => 
        item._id.toString() === req.params.id)

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
    putList, 
    putListItem 
}