const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ShoppingList = require('../../models/shoppingListModel');

// Add Shopping List

const postList = asyncHandler(async (req, res) => {
    const { name } = req.body;
    
    if (!req.user) {
        res.status(400);
        throw new Error('User Not Found. Possible Bad Token')
    }
    
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
        name
    });
    if (shoppingListCreate.length) {
        res.status(201).json(shoppingListCreate);
    } else {
        res.status(500);
        throw new Error('An Error Occured When Adding Shopping List')
    }  
});

// Add Shopping List Item

const postListItem = asyncHandler(async (req, res) => {
    let { name, quantity, category, description, checked } = req.body;

    if (!req.user) {
        res.status(400);
        throw new Error('User Not Found. Possible Bad Token')
    }

    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }
    if (!userVerify(req.user, shoppingList)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }
    if (shoppingList.items.some(item => item.name === name)) {
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
    if (!category || category.startsWith(' ')) {
        category = "Other";
    }
    if (!description || description.startsWith(' ')) {
        description = "";
    }
    if (!checked) {
        checked = false;
    } 

    const newItem = {
        name, quantity, category, description, checked
    };

    shoppingList.items.push(newItem)
    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList, {new: true});
    
    if (updatedShoppingList.items.some(item => item.name === name)) {
        res.status(201).json(updatedShoppingList.items);
    } else {
        res.status(500);
        throw new Error('An Error Occured When Adding Shopping List Item')
    }  
});

module.exports = {
    postList, 
    postListItem 
}