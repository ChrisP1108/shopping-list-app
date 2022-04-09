const mongoose = require('mongoose');

const shoppingListSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Shopping List Name Must Be Provided']
    },
    items: [{
        name: {
            type: String,
            required: [false]
        },
        quantity: {
            type: Number,
            required: [false]
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema)