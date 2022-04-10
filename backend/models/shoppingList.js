const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true]
    },
    quantity: {
        type: Number,
        required: [true]
    }
})

const shoppingListSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Shopping List Name Must Be Provided']
    },
    items: [itemSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema)