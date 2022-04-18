const asyncHandler = require('express-async-handler');
const { userVerify } = require('../../middleware/userMiddleware');
const ActiveList = require('../../models/activeListModel');

// Clear Active Shopping List Item

const deleteActiveList = asyncHandler(async (req, res) => {
    const activeList = await ActiveList.findById(req.params.id);
    if (!ActiveList) {
        res.status(400);
        throw new Error('Active Shopping List Already Empty')
    }
    if (!userVerify(req.user, activeList)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    await activeList.remove();
    const deletedVerify = await ActiveList.find({ user: req.params.id });
    if (!deletedVerify.length) {
        res.status(200).json({ id: req.params.id });
    } else {
        res.status(500);
        throw new Error('An Error Occured When Deleting Active List')
    }
    
});

module.exports = { deleteActiveList }