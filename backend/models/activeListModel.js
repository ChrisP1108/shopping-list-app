const mongoose = require('mongoose');

const activeListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: 'User'
    },
    activeShoppingList: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: 'ShoppingList'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ActiveList', activeListSchema)