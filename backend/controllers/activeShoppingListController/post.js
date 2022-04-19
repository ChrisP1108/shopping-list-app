const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ShoppingList = require('../../models/shoppingListModel');
const ActiveList = require('../../models/activeListModel');

// Set Active Shopping List

const postActiveList = asyncHandler(async (req, res) => {

    const { activeShoppingList } = req.body;
    
    if (!req.user) {
        res.status(400);
        throw new Error('User Not Found. Possible Bad Token')
    }

    if (!activeShoppingList) {
        res.status(400);
        throw new Error('A Shopping List ID Must Be Provided')
    }

    const shoppingList = await ShoppingList.findById(activeShoppingList);

    if (!shoppingList) {
        res.status(400);
        throw new Error('Shopping List ID Not Valid')
    }

    if (!userVerify(req.user, shoppingList)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    const output = {
        user: req.user.id, 
        activeShoppingList: shoppingList._id 
    }

    const activeList = await ActiveList.find({ user: req.user.id });

    if (!activeList.length) {
        const activeListCreate = await ActiveList.create(output);
        if (activeListCreate) {
            res.status(201).json(activeListCreate);
        } else {
            res.status(500);
            throw new Error('An Error Occured When Setting Active List')
        }  
    } else {
        const activeListCreate = await ActiveList
            .findByIdAndUpdate(activeList._id, output, { new: true });
        if (activeListCreate) {
            res.status(201).json(activeListCreate);
        } else {
            res.status(500);
            throw new Error('An Error Occured When Updating Active List');
        }  
    }
});

module.exports = { postActiveList }