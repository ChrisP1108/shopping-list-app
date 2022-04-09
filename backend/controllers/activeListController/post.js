const asyncHandler = require('express-async-handler');

// Add Active Shopping List

const postActiveList = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('A Shopping List Name Must Be Provided')
    }
    res.status(200).json({ msg: 'Post New Active Shopping List'})
});

module.exports = { postActiveList }