const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ShoppingList = require('../../models/shoppingListModel');

// Update Shopping List Name By ID

const putList = asyncHandler(async (req, res) => {
    const { name } = req.body
    
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
    if (!name) {
        res.status(400);
        throw new Error('Shopping List Name Must Be Defined')
    }
    if (shoppingList.name === name) {
        res.status(400);
        throw new Error('Shopping List Already Has The Same Name')
    }
    const checkForDuplicates = await ShoppingList.find({user: req.user.id});
    if (checkForDuplicates.some(item => item.name === name)) {
        res.status(400);
        throw new Error('Another Shopping List Item Has The Same Name')
    }
    shoppingList.name = name;
    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList, {new: true});
    if (updatedShoppingList) {
        res.status(200).json(updatedShoppingList);
    } else {
        res.status(500);
        throw new Error('An Error Occured When Adding Shopping List Item')
    }  
});

// Reset Shopping List Items Checked Values To False

const putResetItemsChecked = asyncHandler(async (req, res) => {
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
    if (shoppingList.items.length) {
        shoppingList.items = shoppingList.items.map(item => ({ ...item, checked: false }));
    }
    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList, {new: true});
    if (updatedShoppingList) {
        res.status(200).json(updatedShoppingList.items);
    } else {
        res.status(500);
        throw new Error('An Error Occured When Adding Shopping List Item')
    }  
});

// Update Shopping List Item By ID

const putListItem = asyncHandler(async (req, res) => {
    const {name, quantity, category, description, checked } = req.body
    
    if (!req.user) {
        res.status(400);
        throw new Error('User Not Found. Possible Bad Token')
    }

    const shoppingListId = req._parsedUrl.pathname.split('/')[1];
    const shoppingList = await ShoppingList.findById(shoppingListId);

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user, shoppingList)) {
        res.status(401);
        throw new Error('User Not Authorized')
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
        req.body.category = "Other";
    }
    if (!description || description.startsWith(' ')) {
        req.body.description = "";
    }
    if (!checked) {
        req.body.checked = false;
    }

    const shoppingListItem = shoppingList.items.find(item => 
        item._id.toString() === req.params.id)

    if (!shoppingListItem) {
        res.status(400);
        throw new Error('Shopping List Item Not Found')
    }

    if (shoppingList.items.some(item => item.name === req.body.name)) {
        res.status(400);
        throw new Error('A Shopping List Item Already Has The Same Name');
    }

    shoppingList.items = shoppingList.items.map(item => 
        item._id.toString() === shoppingListItem._id.toString() ? req.body : item);

    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(shoppingListId, shoppingList, {new: true});
    if (updatedShoppingList.items.some(item => item.name === name)) {
        res.status(200).json(updatedShoppingList.items.find(item => item.name === name));
    } else {
        res.status(500);
        throw new Error('An Error Occured When Adding Shopping List Item')
    }  
});

module.exports = { 
    putList, 
    putResetItemsChecked,
    putListItem 
}