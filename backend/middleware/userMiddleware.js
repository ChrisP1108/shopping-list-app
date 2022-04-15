function userVerify(a, b) {
    if (!a || !b) {
        return false
    }
    return a.toString() === b.toString()
}

module.exports = { userVerify }