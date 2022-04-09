function postActiveList (req, res) {
    return res.status(200).json({ msg: 'Post New Active Shopping List'})
}

module.exports = { postActiveList }