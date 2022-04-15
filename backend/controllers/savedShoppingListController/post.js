const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ShoppingList = require('../../models/shoppingListModel');
const ActiveList = require('../../models/activeListModel');
const User = require('../../models/userModel');

// Set Active Shopping List

const postActiveList = asyncHandler(async (req, res) => {
    const { user, activeShoppingList } = req.body;

    const activeList = await ActiveList.find();
    const shoppingList = await ShoppingList.findById(activeShoppingList);
    const userId = await User.findById(user);

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List ID Not Valid')
    }

    if (!userVerify(req.user.id, shoppingList.user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    if (!userId) {
        res.status(400);
        throw new Error('User ID Not Valid')
    }

    const output = {
        user: userId._id, 
        activeShoppingList: shoppingList._id 
    }

    let activeListCreate;

    if (!activeList.length) {
        activeListCreate = await ActiveList.create(output);
        res.status(200).json(activeListCreate)
    } else {
        activeListCreate = await ActiveList
            .findByIdAndUpdate(activeList._id, output, { new: true });
        const outputList = await ActiveList.find();
        res.status(200).json(outputList)
    }
})

// Add Shopping List

const postList = asyncHandler(async (req, res) => {
    const { name, items } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('A Shopping List Name Must Be Provided')
    }
    const shoppingList = await ShoppingList.find({ user: req.user.id });
    if (shoppingList.some(list => list.name === name)) {
        res.status(400);
        throw new Error('A Shopping List With The Same Name Already Exists')
    }

    const shoppingListCreate = await ShoppingList.insertMany({
        user: req.user.id,
        name: name,
        items: items
    })
    res.status(200).json(shoppingListCreate)
});

// Add Shopping List Item

const postListItem = asyncHandler(async (req, res) => {
    const { name, quantity } = req.body
    let shoppingList = await ShoppingList.find({ _id: req.params.id });
    shoppingList = shoppingList[0];
    if(!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }
    if (!userVerify(req.user.id, shoppingList.user)) {
        res.status(401);
        throw new Error('User Not Authorized')
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
    postList, 
    postListItem 
}