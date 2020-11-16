//IMPORTS
const {coupons: coupon_schema} = require('../config/schema')
const tool = require('../tools/helpers')
const {get_one: get} = require('../config/models')

const destructure_coupon = (req, res, next) => {
    //SET UP FLAGS AND ERRORS (move to global)
    if(!('flags' in req)) req.flags = {success: true, errors: false}
    if(!('errors' in req)) req.errors = {}

    //REMOVE AND STORE SPECIAL FIELDS
    req.limit = tool.pop_object(req.body, 'limit')
    req.category = tool.pop_object(req.body, 'category')

    //REMOVE INVALID FIELDS
    const invalid_fields = tool.remove_invalid_fields(req.body, coupon_schema.valid)
    if (invalid_fields.length) {
        req.errors.invalid_fields = invalid_fields
        req.flags.errors = true
    }

    next()
}

//CHECK IF THE COUPON IS VALID
const valid_coupon = async (req, res, next) => {
    //SET UP FLAGS AND ERRORS (move to global)
    if(!('flags' in req)) req.flags = {success: true, errors: false}
    if(!('errors' in req)) req.errors = {}

    //CHECK IF ALL REQUIRED FIELDS ARE GIVEN
    const missing_fields = tool.has_required_fields(req.body, coupon_schema.required)
    if (missing_fields.length) {
        req.errors.missing_fields = missing_fields
        req.flags.success = false
        req.flags.errors = true
    } else {
        req.category = {name: req.body.category} //needed for coupon-category table
        delete req.body.category
    }

    //CHECK FOR AND REMOVE ANY INVALID FIELDS
    const invalid_fields = tool.remove_invalid_fields(req.body, coupon_schema.valid)
    if (invalid_fields.length) {
        req.errors.invalid_fields = invalid_fields
        req.flags.errors = true
    }

    //CHECK IF COUPON ALREADY EXISTS
    const hash = tool.hash_object({...req.body, category: req.category})
    const coupon = await get('coupons', {hash})
    if(coupon) {
        req.errors.misc = 'coupon already exists'
        req.flags.errors = true
        req.flags.success = false
    } else
        req.body.hash = hash
    
    next()
}

//EXPORTS
module.exports = {
    valid_coupon,
    destructure_coupon
}