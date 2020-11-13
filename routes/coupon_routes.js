//IMPORTS
const model = require('../config/models')
const mw = require('../middleware')
const {log_error} = require('../tools/errors')
//GLOBALS
const TABLE = 'coupons'

module.exports = app => {
    app.post('/add/coupon', mw.valid_coupon, mw.get_category_id, add_coupon),
    app.post('/coupons', mw.destructure_coupon, get_coupons)
    app.post('/test', test)
}

const test = async (req, res) => {
    try {
        const result = await model.get_category(req.body.category)
        res.status(200).send(result)
    } catch (err) {
        console.log('------------')
        console.log(err.message)
        console.log('------------')
        res.status(200).send(err.message)
    }
}

const get_coupons = async (req, res) => {
    const coupons = req.category
        ? await model.get_all({tbl1: TABLE, obj1: req.body, limit: req.limit})
        : await model.get_all({tbl1: TABLE, obj1: req.body, limit: req.limit})
    const response = {results: coupons}
    if(req.flags.errors) response.errors = req.errors
    res.status(200).send(response)
}

const add_coupon = async (req, res) => {
    const REQUEST_TYPE = 'post'

    //HIT DATABASE
    if (req.flags.success) {
        try {
            const {id: coupon_id} = await model.post(TABLE, req.body)
            await model.post('coupon_categories', {coupon_id, category_id: req.category_id})
            req.body.category = req.category.name
        } catch (err) {
            log_error('DATABASE ERROR', REQUEST_TYPE, err.code, TABLE, req.body)
            console.log(err.message)
            req.flags.success = false
            req.errors.database = err.code
        }
    }

    //PREPARE RESPONSE
    const status = req.flags.success ? 200 : 400
    const response = {success: req.flags.success}
    if(req.flags.success) response.data = req.body      //return what was added
    if(req.flags.errors) response.errors = req.errors   //return any errors

    //SEND RESPONSE
    res.status(status).send(response)
}