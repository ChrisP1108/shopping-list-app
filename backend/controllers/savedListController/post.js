function postSavedList (req, res) {
    return res.status(200).json({ msg: 'Post New Saved Shopping List'})
}

module.exports = { postSavedList }