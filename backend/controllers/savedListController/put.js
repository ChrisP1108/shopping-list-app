const asyncHandler = require('express-async-handler');

// Update Saved Shopping List By ID

const putSavedList = asyncHandler((req, res) => {
    res.status(200).json({ msg: `Updated Saved Shopping List ${req.params.id}`})
});

module.exports = { putSavedList }