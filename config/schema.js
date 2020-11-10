const coupons = {
    required: ['title','code'],
    valid: new Set(['title', 'code', 'category','description'])
}

const users = {
    required: [],
    valid: new Set([])
}

module.exports = {
    coupons,
    users
}