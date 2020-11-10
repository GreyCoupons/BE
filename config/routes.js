const model = require('./models')
const mw = require('../middleware')
const {log_error} = require('../tools/errors')

module.exports = app => {
    app.post('/coupons', mw.valid_coupon, add_coupon),
    app.get('/coupons', get_coupons)
}

const get_coupons = (req, res) => {
    console.log('getting coupons')
    res.send(404)
}

const add_coupon = async (req, res) => {
    const TABLE = 'coupons'
    const REQUEST_TYPE = 'post'

    //HIT DATABASE
    if (req.flags.success) {
        try {
            await model.post(TABLE, req.body)
        } catch (err) {
            log_error('DATABASE ERROR', REQUEST_TYPE, err.code, TABLE, req.body)
            req.flags.success = false
            req.errors.database = err.code
        }
    }

    //PREPARE RESPONSE
    const status = req.flags.success ? 200 : 400
    const response = {success: req.flags.success}
    if(req.flags.success) response.data = req.body
    if(req.flags.errors) response.errors = req.errors

    //SEND RESPONSE
    res.status(status).send(response)
}