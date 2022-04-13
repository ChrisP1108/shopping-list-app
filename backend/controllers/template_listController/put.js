const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');

// Update Shopping List By ID

const putList = asyncHandler(async (req, res, ShoppingList) => {
    const { name } = req.body
    const shoppingList = await ShoppingList.find({ _id: req.params.id });
    
    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user.id, shoppingList[0].user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }
    if (!name) {
        res.status(400);
        throw new Error('Shopping List Name Must Be Defined')
    }

    shoppingList[0].name = name;

    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList[0], {new: true});

    let updatedRes = await ShoppingList.findById(req.params.id);
    res.status(200).json(updatedRes); 
});

// Update Shopping List Item By ID

const putListItem = asyncHandler(async (req, res, ShoppingList) => {
    const { name, quantity } = req.body
    
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

    if(!req.body || !name || !quantity) {
        res.status(400);
        throw new Error('Shopping List Item Must Have A Name And Quantity To Update')
    }

    const shoppingListItem = shoppingList[0].items.find(item => 
        item._id.toString() === req.params.id)

    if (!shoppingListItem) {
        res.status(400);
        throw new Error('Shopping List Item Not Found')
    }

    shoppingList[0].items = shoppingList[0].items.map(item => 
        item._id.toString() === shoppingListItem._id.toString() ? req.body : item);

    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(shoppingListId, shoppingList[0], {new: true});

    let updatedRes = await ShoppingList.findById(shoppingListId);
    updatedRes = updatedRes.items.find(item => item.name === name);
    res.status(200).json(updatedRes); 
});

module.exports = { 
    putList, 
    putListItem 
}