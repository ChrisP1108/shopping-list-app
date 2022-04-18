const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ActiveList = require('../../models/activeListModel');

// Get Active List

const getActiveList = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error('User Not Authorized')
    }
    const activeList = await ActiveList.find({ user: req.user.id });
    if (activeList.length) {
        if (!userVerify(req.user, activeList[0])) {
            res.status(401);
            throw new Error('User Not Authorized')
        }
    }

    res.status(200).json(activeList[0]);
});

module.exports = { getActiveList }