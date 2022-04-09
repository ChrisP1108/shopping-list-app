function deleteSavedList (req, res) {
    return res.status(200).json({ msg: `Deleted Saved Shopping List ${req.params.id}`})
}

module.exports = { deleteSavedList }