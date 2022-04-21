const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ShoppingList = require('../../models/shoppingListModel');
const ActiveList = require('../../models/activeListModel');

// Delete Shopping Lists

const deleteLists = asyncHandler(async (req, res) => {
    if (typeof req.body !== 'object' || !req.body.length) {
        res.status(400);
        throw new Error('Insufficient Request Data.  Lists To Delete Must Be In A String Array')
    }

    req.body.forEach(id => {
        if (typeof id !== 'string') {
            res.status(400);
            throw new Error("List ID's To Delete Must Be In A String Array")
        }
    })
    
    if (!req.user) {
        res.status(400);
        throw new Error('User Not Found. Possible Bad Token')
    }

    const shoppingLists = await ShoppingList.find({ user: req.user.id });

    const activeList = await ActiveList.find({ user: req.user.id });

    if (!shoppingLists.length) {
        res.status(400);
        throw new Error('No Shopping Lists Were Found')
    }

    if (!userVerify(req.user, shoppingLists[0])) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    let activeFound = false;

    let anythingFound = false;

    req.body.forEach(async (item) => {
        const index = shoppingLists.findIndex(i => i._id.toString() === item);
        if (index !== -1) {
            anythingFound = true;
            await shoppingLists[index].remove();
            if (activeList.length) {
                if (activeList[0].activeShoppingList.toString() === item.toString()) {
                    await activeList[0].remove();
                    activeFound = true;
                }
            }
        }
    });

    if (!anythingFound) {
        res.status(400);
        throw new Error("Shopping Lists Not Found Based Upon ID's Provided")
    }

    const deletedSavedVerify = await ShoppingList.find({ user: req.user.id });
    
    const savedDeleted = deletedSavedVerify.every(item => !req.body.includes(item))
    
    let deletedActiveVerify = [];
    
    if (activeFound) {
        deletedActiveVerify = await ActiveList.find({ user: req.user.id });
    }
    if (!deletedActiveVerify.length && savedDeleted) {
        res.status(200).json(deletedSavedVerify);
    } else {
        res.status(500);
        throw new Error('An Error Occured When Deleting All Saved Shopping Lists');
    }
});

// Delete Shopping List By ID

const deleteList = asyncHandler(async (req, res) => {
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

    const activeList = await ActiveList.find({ activeShoppingList: req.params.id });

    if (activeList.length) {
        await activeList[0].remove();
        const deletedActiveVerify = await ActiveList.find({ activeShoppingList: req.params.id });
        if (deletedActiveVerify.length) {
            res.status(500);
            throw new Error('An Error Occured When Deleting Active List Since It Corresponded To Shopping List Item');
        }
    }

    await shoppingList.remove();
    const deletedVerify = await ShoppingList.findById(req.params.id);
    if (!deletedVerify) {
        res.status(200).json({ id: req.params.id });
    } else {
        res.status(500);
        throw new Error('An Error Occured When Deleting Specified Shopping List');
    }
});

// Delete Shopping List Items

const deleteListItems = asyncHandler(async (req, res) => {
    if (typeof req.body !== 'object' || !req.body.length) {
        res.status(400);
        throw new Error('Insufficient Request Data.  Items To Delete Must Be In A String Array')
    }

    req.body.forEach(id => {
        if (typeof id !== 'string') {
            res.status(400);
            throw new Error("Item ID's To Delete Must Be In A String Array")
        }
    })

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

    req.body.forEach(async (item) => {
        const index = shoppingList.items.findIndex(i => i._id.toString() === item);
        if (index !== -1) {
            shoppingList.items.splice(index, 1);
        }
    });
    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(shoppingListId, shoppingList, {new: true});
    if (updatedShoppingList.items.every(item => !shoppingList.items.some(i => i._id === item.id))) {
        res.status(200).json(updatedShoppingList);
    } else {
        res.status(500);
        throw new Error('An Error Occured When Deleting Shopping List Items');
    }
});

// Delete Shopping List Item By ID

const deleteListItem = asyncHandler(async (req, res) => {
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

    const shoppingListItem = shoppingList.items.find(item => item._id.toString() === req.params.id)

    if (!shoppingListItem) {
        res.status(400);
        throw new Error('Shopping List Item Not Found')
    }

    shoppingList.items = shoppingList.items.filter(item => item._id.toString() !== shoppingListItem._id.toString());

    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(shoppingListId, shoppingList, {new: true});
    if (!updatedShoppingList.items.some(item => item._id.toString() === req.params.id)) {
        res.status(200).json({ id: req.params.id });
    } else {
        res.status(500);
        throw new Error('An Error Occured When Deleting Shopping List Items');
    } 
});

module.exports = { 
    deleteLists,
    deleteList, 
    deleteListItems, 
    deleteListItem 
}