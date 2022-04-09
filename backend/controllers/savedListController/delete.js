const asyncHandler = require('express-async-handler');

// Delete Saved Shopping List By ID

const deleteSavedList = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: `Deleted Saved Shopping List ${req.params.id}`})
});

module.exports = { deleteSavedList }