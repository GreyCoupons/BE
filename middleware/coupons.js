//IMPORTS
const {coupons: schema} = require('../config/schema')
const tool = require('../tools/helpers')

//CHECK IF THE COUPON IS VALID
const valid_coupon = (req, res, next) => {
    //SET UP FLAGS AND ERRORS (move to global)
    if(!('flags' in req)) req.flags = {success: true, errors: false}
    if(!('errors' in req)) req.errors = {}

    //CHECK IF ALL REQUIRED FIELDS ARE GIVEN
    const missing_fields = tool.has_required_fields(req.body, schema.required)
    if (missing_fields.length) {
        req.errors.missing_fields = missing_fields
        req.flags.success = false
        req.flags.errors = true
    }

    //CHECK FOR AND REMOVE ANY INVALID FIELDS
    const invalid_fields = tool.remove_invalid_fields(req.body, schema.valid)
    if (invalid_fields.length) {
        req.errors.invalid_fields = invalid_fields
        req.flags.errors = true
    }
    
    next()
}

//EXPORTS
module.exports = {
    valid_coupon
}