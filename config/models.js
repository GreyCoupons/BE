const db = require('./db')

const post = async (tbl, obj) =>
    (await db(tbl).insert(obj).returning('*'))[0]

const get_one = async (tbl, obj) =>
    (await db(tbl).where(obj))[0]

const get_category = async (category) =>
    await db
        .select('c.*')
        .from('coupons as c')
        .join('coupon_categories as cc', 'cc.coupon_id', 'c.id')
        .join('categories as cat', 'cc.category_id', 'cat.id')
        .where('name', '=', category)

const get_all = async ({tbl1, obj1, tbl2, obj2, limit}) => {
    const builder = db(tbl1).where(obj1)
    if(tbl2) builder.innerJoin(tbl2).where(obj2)
    if(limit) builder.limit(limit)
    return await builder
}

module.exports = {
    get_one,
    get_all,
    post,
    get_category
}