const mongoose = require('mongoose');

const ShoppingListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'A Shopping List Name Must Be Provided'],
        unique: true
    },
    items: [{
        name: {
            type: String,
            required: [true, 'An item name must be entered'],
            unique: false
        },
        quantity: {
            type: Number,
            required: [true, 'An item quantity must be entered'],
            unique: false
        },
        category: {
            type: String,
            required: [false]
        },
        description: {
            type: String,
            required: [false]
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('ShoppingList', ShoppingListSchema)