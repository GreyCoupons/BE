const coupons = {
    required: ['title','code','category'],
    valid: new Set(['title', 'code', 'description'])
}

const users = {
    required: [],
    valid: new Set([])
}

const categories = {
    required: ['name'],
    valid: new Set(['name'])
}

module.exports = {
    users,
    coupons,
    categories
}