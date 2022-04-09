const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/shoppingList');

// Add Active Shopping List

const postActiveList = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('A Shopping List Name Must Be Provided')
    }
    const shoppingList = await ShoppingList.create({
        name: req.body.name,
        items: req.body.items
    })
    res.status(200).json(shoppingList)
});

module.exports = { postActiveList }