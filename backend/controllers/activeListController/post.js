const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/shoppingList');

// Add Active Shopping List

const postActiveList = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('A Shopping List Name Must Be Provided')
    }
    const shoppingList = await ShoppingList.find();
    if(shoppingList.length) {
        res.status(400);
        throw new Error('An Active Shopping List Already Exists')
    }
    const shoppingListCreate = await ShoppingList.create({
        name: req.body.name,
        items: req.body.items
    })
    res.status(200).json(shoppingListCreate)
});

// Add Active Shopping List Item

const postActiveListItem = asyncHandler(async (req, res) => {
    const shoppingList = await ShoppingList.findById(req.params.id);
    if(!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }
    if(shoppingList.items.some(item => item.name === req.body.name)) {
        res.status(400);
        throw new Error('A Shopping List Item With The Same Name Already Exists')
    }
    if (!req.body.name) {
        res.status(400);
        throw new Error('A Shopping List Item Name Must Be Provided')
    }
    if (!req.body.quantity) {
        res.status(400);
        throw new Error('A Shopping List Item Quantity Must Be Provided')
    }
    shoppingList.items.push(req.body)
    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList, {new: true});
    
    let updatedRes = await ShoppingList.findById(req.params.id);
    updatedRes = updatedRes.items.find(item => item.name === req.body.name);
    res.status(200).json(updatedRes); 
});

module.exports = { 
    postActiveList, 
    postActiveListItem 
}