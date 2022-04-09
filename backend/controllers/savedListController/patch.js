const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/shoppingList');

// Update/Add/Delete Item In Saved Shopping List By ID

const patchSavedList = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: `Updated Saved Shopping List Item ${req.params.id}`})
});

module.exports = { patchSavedList }