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
    if (name.length > 15 || name.length < 8 || typeof name !== 'string') {
            res.status(400);
            throw new Error('List Name Cannot Have Spaces Or Be Less Than 8 Or Greater Than 15 Characters')
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

// Add Shopping List Items

const postListItems = asyncHandler(async (req, res) => {
    if (typeof req.body !== 'object' || !req.body.length) {
        res.status(400);
        throw new Error('Insufficient Request Data')
    }

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

    req.body.forEach(item => {
        const { name, quantity, category, description, checked } = item;
        if (shoppingList.items.some(item => item.name === name)) {
            res.status(400);
            throw new Error('A Shopping List Item With The Same Name Already Exists')
        }
        if (!name) {
            res.status(400);
            throw new Error('A Shopping List Item Names Must Be Provided')
        }
        if (name && typeof name !== 'string') {
            res.status(400);
            throw new Error('A Shopping List Name Must Be A String Variable')
        }
        if (!quantity) {
            res.status(400);
            throw new Error('A Shopping List Item Quantity Must Be Provided')
        }
        if (quantity && typeof quantity !== 'number') {
            res.status(400);
            throw new Error('A Shopping List Item Quantity Must Be A Number Variable')
        }
        if (category && typeof category !== 'string') {
            res.status(400);
            throw new Error('A Shopping List Item Category Must Be A String Variable')
        }
        if (description && typeof description !== 'string') {
            res.status(400);
            throw new Error('A Shopping List Item Description Must Be A String Variable')
        }
        if (checked && typeof checked !== 'boolean') {
            res.status(400);
            throw new Error('A Shopping List Item Checked Value Must Be A Boolean')
        }
    });
    
    if (!userVerify(req.user, shoppingList)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    const newItems = req.body.map(item => {
        let { name, quantity, category, description, checked } = item;
        if (!category || category.startsWith(' ')) {
            category = "Other";
        }
        if (!description || description.startsWith(' ')) {
            description = "";
        }
        if (!checked) {
            checked = false;
        }
        return { name, quantity, category, description, checked } 
    });

    shoppingList.items = [...shoppingList.items, ...newItems];
    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(shoppingListId, shoppingList, {new: true});
    
    if (newItems.every(item => updatedShoppingList.items.some(i => i.name === item.name))) {
        res.status(201).json(updatedShoppingList.items);
    } else {
        res.status(500);
        throw new Error('An Error Occured When Adding Shopping List Items')
    }  
});

module.exports = {
    postList, 
    postListItems 
}