function patchActiveList (req, res) {
    return res.status(200).json({ msg: `Updated Active Shopping List Item ${req.params.id}`})
}

module.exports = { patchActiveList }