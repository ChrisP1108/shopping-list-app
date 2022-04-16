const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ActiveList = require('../../models/activeListModel');

// Clear Active Shopping List Item

const deleteActiveList = asyncHandler(async (req, res) => {
    const activeList = await ActiveList.find();
    if (!activeList.length) {
        res.status(400);
        throw new Error('Active Shopping List Already Empty')
    }
    if (!userVerify(req.user, activeList[0])) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    await activeList[0].remove()
    res.status(200).json({ id: req.params.id });
});

module.exports = { deleteActiveList }