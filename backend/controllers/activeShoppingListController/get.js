const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ActiveList = require('../../models/activeListModel');
const ShoppingList = require('../../models/shoppingListModel');

// Get Active List

const getActiveList = asyncHandler(async (req, res) => {
    const activeList = await ActiveList.find();
    
    if (activeList.length) {
        if (!userVerify(req.user.id, activeList[0].user)) {
            res.status(401);
            throw new Error('User Not Authorized')
        }
    }

    res.status(200).json(activeList);
});

module.exports = { getActiveList }