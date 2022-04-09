function patchSavedList (req, res) {
    return res.status(200).json({ msg: `Updated Saved Shopping List Item ${req.params.id}`})
}

module.exports = { patchSavedList }