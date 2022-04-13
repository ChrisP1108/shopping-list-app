const mongoose = require('mongoose');
const { shoppingListModel } = require('./template_shoppingListModel');

const activeShoppingListSchema = mongoose.Schema(shoppingListModel, {
    timestamps: true
});

module.exports = mongoose.model('ActiveShoppingList', activeShoppingListSchema)