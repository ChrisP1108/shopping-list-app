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
    if (name.length > 15 || name.length < 8 || typeof name !== 'string') {
        res.status(400);
        throw new Error('List Name Cannot Have Spaces Or Be Less Than 8 Or Greater Than 15 Characters')
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
        throw new Error('An Error Occured When Updating Shopping List Name')
    }  
});

// Update Shopping List Items

const putListItems = asyncHandler(async (req, res) => {
    if (typeof req.body !== 'object' || !req.body.length) {
        res.status(400);
        throw new Error('Insufficient Request Data.  Items To Update Must Be In An Array')
    }

    req.body.forEach(item => {
        const { _id, name, quantity, category, description, checked } = item;

        if (!_id) {
            res.status(400);
            throw new Error("Shopping List Items Must Have Their ID's Provided")
        }
        if (name && typeof name !== 'string') {
            res.status(400);
            throw new Error('A Shopping List Item Name Must Be A String Variable')
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

    if (!req.user) {
        res.status(400);
        throw new Error('User Not Found. Possible Bad Token')
    }

    const shoppingListId = req._parsedUrl.pathname.split('/')[1];
    console.log(shoppingListId)
    const shoppingList = await ShoppingList.findById(shoppingListId);

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user, shoppingList)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }
    if (!shoppingList.items.length) {
        res.status(400);
        throw new Error('There Are No Items In The Shopping List To Update')
    }

    let inputNames = [];

    req.body.forEach(item => {
        const { _id, name, quantity, category, description, checked } = item;
        const index = shoppingList.items.findIndex(i => i._id.toString() === _id.toString());
        if (index !== -1) {
            if (name) {
                shoppingList.items[index].name = name;
                inputNames.push(name);
            }
            if (quantity) {
                shoppingList.items[index].quantity = quantity;
            }
            if (category) {
                shoppingList.items[index].category = category;
            }
            if (description) {
                shoppingList.items[index].description = description;
            }
            if (checked === true) {
                shoppingList.items[index].checked = true;
            } else shoppingList.items[index].checked = false;
        }
    });

    if (inputNames.length > 0) {
        inputNames.forEach(name => {
            if (shoppingList.items.filter(item => item.name === name).length > 1) {
                res.status(400);
                throw new Error('There Will Be Two Items With The Same Name')
            }
        });
    }
    
    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(shoppingListId, shoppingList, {new: true});
    if (updatedShoppingList.items.every(item => shoppingList.items.some(i => i.name === item.name))) {
        res.status(200).json(updatedShoppingList.items);
    } else {
        res.status(500);
        throw new Error('An Error Occured When Adding Shopping List Item')
    }  
});

// Update Shopping List Item By ID

const putListItem = asyncHandler(async (req, res) => {
    let {name, quantity, category, description, checked } = req.body
    
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
    if (name && typeof name !== 'string') {
        res.status(400);
        throw new Error('A Shopping List Item Names Must Be A String Variable')
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
    if (!category || category.startsWith(' ')) {
        category = "Other";
    }
    if (description && typeof description !== 'string') {
        res.status(400);
        throw new Error('A Shopping List Item Description Must Be A String Variable')
    }
    if (!description || description.startsWith(' ')) {
        description = "";
    }
    if (checked && typeof checked !== 'boolean') {
        res.status(400);
        throw new Error('A Shopping List Item Checked Value Must Be A Boolean')
    }
    if (!checked) {
        checked = false;
    }

    const updatedItem = {
        name, quantity, category, description, checked
    };

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
        item._id.toString() === shoppingListItem._id.toString() ? updatedItem : item);

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
    putListItems,
    putListItem 
}