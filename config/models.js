const db = require('./db')

const post = async (tbl, obj) =>
    await db(tbl).insert(obj)

const get_one = async (tbl, obj) =>
    (await db(tbl).where(obj))[0]

const get_all = async (tbl, obj, limit=false) => {
    if(limit)
        return await db(tbl).where(obj).limit(limit)
    return await db(tbl).where(obj)
}

module.exports = {
    get_one,
    get_all,
    post
}