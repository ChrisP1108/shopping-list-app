function deleteActiveList (req, res) {
    return res.status(200).json({ msg: `Deleted Active Shopping List ${req.params.id}`})
}

module.exports = { deleteActiveList }