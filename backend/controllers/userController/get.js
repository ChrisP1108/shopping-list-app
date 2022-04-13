const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const ActiveShoppingList = require('../../models/activeShoppingListModel');
const SavedShoppingList = require('../../models/savedShoppingListModel');

// Get User Data

const getUser = asyncHandler(async (req, res) => {
    const { username } = req.body;
    
    const userLogin = await User.find({ username });
    if(!userLogin) {
        res.status(400);
        throw new Error('User Not Found')
    }

    const activeList = await ActiveShoppingList.find({ user: req.user.id })
    const savedList = await SavedShoppingList.find({ user: req.user.id })
    res.status(200).json({ 
        user: userLogin[0],
        activeShoppingList: [...activeList ],
        savedShoppingLists: [...savedList]
    });
});

module.exports = { getUser }