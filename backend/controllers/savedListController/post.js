const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/shoppingList');

// Add Active Shopping List

const postSavedList = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('A Shopping List Name Must Be Provided')
    }
    res.status(200).json({ msg: 'Post New Saved Shopping List'})
});

module.exports = { postSavedList }