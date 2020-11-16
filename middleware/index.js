//GLOBAL
const add_flags = (req, res, next) => {
    req.flags = {success: true, errors: false}
    req.errors = {}
    next()
}

module.exports = {
    add_flags,
    ...require('./coupons'),
    ...require('./categories')
}