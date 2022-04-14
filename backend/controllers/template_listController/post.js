const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');

// Add Shopping List

const postList = asyncHandler(async (req, res, ShoppingList, mulOk) => {
    const { name, items } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('A Shopping List Name Must Be Provided')
    }
    const shoppingList = await ShoppingList.find();
    if (!mulOk) {
        if (shoppingList.length) {
            res.status(400);
            throw new Error('Active Shopping List Can Have Only One List At A Time')
        }
    }
    if (shoppingList.some(list => list.name === name)) {
        res.status(400);
        throw new Error('A Shopping List With The Same Name Already Exists')
    }
    
    const shoppingListCreate = await ShoppingList.create({
        user: req.user.id,
        name: name,
        items: items
    })
    res.status(200).json(shoppingListCreate)
});

// Add Shopping List Item

const postListItem = asyncHandler(async (req, res, ShoppingList) => {
    const { name, quantity } = req.body
    const shoppingList = await ShoppingList.find({ _id: req.params.id });

    if(!shoppingList[0]) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }
    if (!userVerify(req.user.id, shoppingList[0].user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }
    if(shoppingList[0].items.some(item => item.name === name)) {
        res.status(400);
        throw new Error('A Shopping List Item With The Same Name Already Exists')
    }
    if (!name) {
        res.status(400);
        throw new Error('A Shopping List Item Name Must Be Provided')
    }
    if (!quantity) {
        res.status(400);
        throw new Error('A Shopping List Item Quantity Must Be Provided')
    }
    shoppingList[0].items.push(req.body)
    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList[0], {new: true});
    
    let updatedRes = await ShoppingList.findById(req.params.id);
    updatedRes = updatedRes.items.find(item => item.name === name);
    res.status(200).json(updatedRes); 
});

module.exports = { 
    postList, 
    postListItem 
}