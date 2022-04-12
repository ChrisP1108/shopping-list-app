const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/savedShoppingList');

// Add Saved Shopping List

const postSavedList = asyncHandler(async (req, res) => {
    const { name, items } = req.body
    if (!req.body.name) {
        res.status(400);
        throw new Error('A Shopping List Name Must Be Provided')
    }
    const shoppingList = await ShoppingList.find();
    if(shoppingList.some(item => item.name === name)) {
        res.status(400);
        throw new Error('A Shopping List With The Same Name Already Exists')
    }
    const shoppingListCreate = await ShoppingList.create({
        name: name,
        items: items
    })
    res.status(200).json(shoppingListCreate)
});

// Add Saved Shopping List Item

const postSavedListItem = asyncHandler(async (req, res) => {
    const { name, quantity } = req.body
    
    const shoppingList = await ShoppingList.findById(req.params.id);
    if(!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }
    if(shoppingList.items.some(item => item.name === name)) {
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
    shoppingList.items.push(req.body)
    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList, {new: true});
    
    let updatedRes = await ShoppingList.findById(req.params.id);
    updatedRes = updatedRes.items.find(item => item.name === name);
    res.status(200).json(updatedRes); 
});

module.exports = { 
    postSavedList, 
    postSavedListItem 
}