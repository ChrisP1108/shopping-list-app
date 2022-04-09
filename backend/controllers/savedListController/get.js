function getSavedLists (req, res) {
    return res.status(200).json({ msg: 'Get Saved Shopping Lists'})
}

function getSavedList (req, res) {
    return res.status(200).json({ msg: `Get Saved Shopping List ${req.params.id}`})
}

module.exports = { getSavedLists, getSavedList }