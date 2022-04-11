const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user: {
        username: {
            type: String,
            required: [true, 'A Username Must Be Provided'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'A Password Must Be Provided'],
            unique: false
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)