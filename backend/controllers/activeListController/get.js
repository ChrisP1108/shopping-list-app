function getActiveLists (req, res) {
    return res.status(200).json({ msg: 'Get Active Shopping Lists'})
}

function getActiveList (req, res) {
    return res.status(200).json({ msg: `Get Active Shopping List ${req.params.id}`})
}

module.exports = { getActiveLists, getActiveList }