function putActiveList (req, res) {
    return res.status(200).json({ msg: `Updated Active Shopping List ${req.params.id}`})
}

module.exports = { putActiveList }