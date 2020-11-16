//IMPORTS
const model = require('../config/models')
const {log_error} = require('../tools/errors')

//GLOBALS
const TABLE = 'categories'

module.exports = app => {
    app.get('/categories', get_categories)
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