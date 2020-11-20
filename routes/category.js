//IMPORTS
const model = require('../config/models')
const mw = require('../middleware')
const {log_error} = require('../tools/errors')

//GLOBALS
const TABLE = 'categories'

module.exports = app => {
    app.get('/categories', mw.get_category_id, get_categories)
}

const add_category = async (req, res) => {
    
    if(req.added.has('category')) null
}

const get_categories = async (req, res) => {
    //SET GLOBAL VARIABLES
    const REQUEST_TYPE = 'get'
    let STATUS = 200
    let results = null

    //HIT DATABASE
    try {
        results = await model.get_all(TABLE)
        results = results.map(category => category.name)
    } catch (err) {
        log_error('DATABASE ERROR', REQUEST_TYPE, err.code, TABLE)
        console.log(err.message)
        STATUS = 400
    }

    //SEND RESPONSE
    res.status(STATUS).send(results)
}