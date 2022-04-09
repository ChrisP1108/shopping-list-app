const asyncHandler = require('express-async-handler');
const ShoppingList = require('../../models/shoppingList');

// Update/Add/Delete Item In Active Shopping List By ID

const patchActiveList = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: `Updated Active Shopping List Item ${req.params.id}`})
});

module.exports = { patchActiveList }