const asyncHandler = require('express-async-handler');

// Delete Active Shopping List By ID

const deleteActiveList = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: `Deleted Active Shopping List ${req.params.id}`})
});

module.exports = { deleteActiveList }