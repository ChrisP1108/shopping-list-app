const asyncHandler = require('express-async-handler');

// Update Active Shopping List By ID

const putActiveList = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: `Updated Active Shopping List ${req.params.id}`})
});

module.exports = { putActiveList }