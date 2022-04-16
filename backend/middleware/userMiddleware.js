function userVerify(user, shoppingListUser) {
    if (!user || !shoppingListUser) {
        return false
    }
    return user._id.toString() === shoppingListUser.user.toString()
}

module.exports = { userVerify }