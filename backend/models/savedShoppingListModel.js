const mongoose = require('mongoose');
const { shoppingListModel } = require('./template_shoppingListModel');

const savedShoppingListSchema = mongoose.Schema(shoppingListModel, {
    timestamps: true
});

module.exports = mongoose.model('SavedShoppingList', savedShoppingListSchema)