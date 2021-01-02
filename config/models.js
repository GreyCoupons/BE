const db = require("./db")

const post = async (tbl, obj) => (await db(tbl).insert(obj).returning("*"))[0]

const get_one = async (tbl, obj) => (await db(tbl).where(obj))[0]

const get_all = async (tbl, obj = {}) => await db(tbl).where(obj)

const remove_coupons = async ({ query, category }) => {
	console.log("query", query)
	console.log("cat", category)
	const builder = db("coupons")
	if (category)
		builder
			.select("coupons.id")
			.join("coupon_categories as cc", "cc.coupon_id", "coupons.id")
			.join("categories as cat", "cc.category_id", "cat.id")
			.where("name", "=", category)
	if (query) builder.where(query)
	const coupons = (await builder).map((coupon) => coupon.id)
	const amount_removed = await db("coupons").whereIn("id", coupons).delete()
	return amount_removed
}

const removeExpired = async ({ query }) => {
	const listOfExpiredID = await db("coupons")
		.where("expirationDate", query)
		.select("id")
		.del()
	if (listOfExpiredID === 0) {
		return "No coupons to remove"
	} else {
		return "successfully deleted expired coupons"
	}
}
const get_coupons = ({ query, category, limit }) => {
	const builder = db("coupons")
		.select("coupons.*", "cat.name as category")
		.join("coupon_categories as cc", "cc.coupon_id", "coupons.id")
		.join("categories as cat", "cc.category_id", "cat.id")
	if (category) builder.where("name", "=", category)
	if (query.title) {
		let title = query.title
		delete query["title"]
		builder.where(query).andWhere("title", "ilike", `%${title}%`)
	} else if (query) builder.where(query)
	if (limit) builder.limit(limit)
	return builder
}

const get_featured = ({ query, featured, limit }) => {
	const builder = db("coupons")
		.select("coupons.*", "feat.name as featured")
		.join("coupon_featured as cc", "cc.coupon_id", "coupons.id")
		.join("featured as feat", "cc.featured_id", "feat.id")
	return builder
}
module.exports = {
	get_one,
	get_all,
	get_coupons,
	post,
	removeExpired,
	remove_coupons,
	get_featured,
}
