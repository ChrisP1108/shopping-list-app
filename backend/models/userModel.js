const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A Username Must Be Provided'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'A Password Must Be Provided'],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, 'A User First Name Must Be Provided'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'A User Email Must Be Provided'],
        unique: true
    },
    settings: {
        themeColor: {
            type: String,
            required: [false],
            unique: false
        },
        sortBy: {
            type: String,
            required: [false],
            unique: false
        },
        showChecked: {
            type: Boolean,
            required: [false],
            unique: false
        }
    },
    recovery: {
        dob: {
            type: String,
            required: [true, 'A User Date Of Birth Must Be Provided'],
            unique: true
        },
        pin: {
            type: String,
            required: [true, 'User 4 Digit Pin Must Be Provided'],
            unique: true
        },
        question: {
            type: String,
            required: [true, 'A Username Recovery Question Must Be Provided'],
            unique: true
        },
        answer: {
            type: String,
            required: [true, 'An Answer Must Be Provided'],
            unique: false
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)