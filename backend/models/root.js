const mongoose = require('mongoose');

const rootSchema = mongoose.Schema({
    user: {
        type: Object,
        required: true,
        ref: 'User'
    },
    activeList: {
        type: Array,
        required: true,
        ref: 'ShoppingList'
    },
    savedLists: {
        type: Array,
        required: true,
        ref: 'ShoppingList'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Root', rootSchema)