function putSavedList (req, res) {
    return res.status(200).json({ msg: `Updated Saved Shopping List ${req.params.id}`})
}

module.exports = { putSavedList }