const mongoose = require('mongoose');

const savedShoppingListSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Shopping List Name Must Be Provided'],
        unique: true
    },
    items: [{
        name: {
            type: String,
            required: [true],
            unique: true
        },
        quantity: {
            type: Number,
            required: [true],
            unique: false
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('SavedShoppingList', savedShoppingListSchema)