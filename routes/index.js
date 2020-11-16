//ROUTES
const coupons = require('./coupon')
const categories = require('./category')

//EXPORT
module.exports = app => {
    coupons(app)
    categories(app)
}