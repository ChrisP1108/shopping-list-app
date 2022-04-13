const { default: mongoose } = require("mongoose")

const shoppingListModel = {
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
            required: [true],
            unique: true
        },
        quantity: {
            type: Number,
            required: [true],
            unique: false
        }
    }]
}

module.exports = { shoppingListModel }