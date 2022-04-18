const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ShoppingList = require('../../models/shoppingListModel');
const ActiveList = require('../../models/activeListModel');

// Delete All Shopping Lists

const deleteAllLists = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(400);
        throw new Error('User Not Found. Possible Bad Token')
    }

    const shoppingLists = await ShoppingList.find({ user: req.user.id });

    const activeList = await ActiveList.find({ user: req.user.id });

    if (!shoppingLists) {
        res.status(400);
        throw new Error('No Shopping Lists Were Not Found')
    }

    if (!userVerify(req.user, shoppingLists[0])) {
        res.status(401);
        throw new Error('User Not Authorized')
    }
    shoppingLists.forEach(async (item) => await item.remove());
    activeList[0].remove();
    const deletedSavedVerify = await ShoppingList.find({ user: req.user.id });
    const deletedActiveVerify = await ActiveList.find({ user: req.user.id });
    if (!deletedSavedVerify.length && !deletedActiveVerify.length) {
        res.status(200).json([]);
    } else {
        res.status(500);
        throw new Error('An Error Occured When Deleting All Saved Shopping Lists');
    }
});

// Delete Shopping List Or Item By ID

const deleteList = asyncHandler(async (req, res) => {
    let shoppingList = await ShoppingList.find({ _id: req.params.id });
    shoppingList = shoppingList[0];

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
        activeList[0].remove();
        const deletedActiveVerify = await ActiveList.find({ activeShoppingList: req.params.id });
        if (deletedActiveVerify.length) {
            res.status(500);
            throw new Error('An Error Occured When Deleting Active List Since It Corresponded To Shopping List Item');
        }
    }

    await shoppingList.remove();
    const deletedVerify = await ShoppingList.find({ _id: req.params.id });
    if (!deletedVerify.length) {
        res.status(200).json({ id: req.params.id });
    } else {
        res.status(500);
        throw new Error('An Error Occured When Deleting Specified Shopping List');
    }
});

// Delete Shopping List Items

const deleteListItems = asyncHandler(async (req, res) => {
    let shoppingList = await ShoppingList.find({ _id: req.params.id });
    shoppingList = shoppingList[0];

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List Not Found')
    }

    if (!userVerify(req.user, shoppingList)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    shoppingList.items = [];
    const updatedShoppingList = await ShoppingList
        .findByIdAndUpdate(req.params.id, shoppingList, {new: true});
    if (!updatedShoppingList.items.length) {
        res.status(200).json(updatedShoppingList);
    } else {
        res.status(500);
        throw new Error('An Error Occured When Deleting Shopping List Items');
    }
});

// Delete Shopping List Item By ID

const deleteListItem = asyncHandler(async (req, res) => {
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
    if (!updatedShoppingList.items.filter(item => item._id.toString() === req.params.id).length) {
        res.status(200).json({});
    } else {
        res.status(500);
        throw new Error('An Error Occured When Deleting Shopping List Items');
    } 
});

module.exports = { 
    deleteAllLists,
    deleteList, 
    deleteListItems, 
    deleteListItem 
}