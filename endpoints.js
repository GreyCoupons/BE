// DEPENDANCIES
const db = require('./config/db')

// EXPORTS

// DB CONNECTIONS
const add_one = async (tbl, obj) => 
    await db(tbl).insert(obj)

const get_some = async (tbl, obj) =>
    await db(tbl).where(obj)

const get_all = async (tbl) =>
    await db(tbl).where('*')

const remove_some = async (tbl, obj) =>
    await db(tbl).where(obj).delete()

// DECONSTRUCT
const deconstruct = (req,res) => {
    console.log('r', req.body)
    res.status(200).send('nope')
}

// ENDPOINTS
module.exports = server => {
    // server.post('/api', deconstruct)
}