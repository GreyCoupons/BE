const coupons = {
	required: ["title", "category"],
	valid: new Set([
		"title",
		"code",
		"description",
		"link",
		"image",
		"price",
		"discount",
		"timestamp",
		"featured",
		"rating",
		"expirationDate",
		"imageAddress",
	]),
}

const users = {
	required: [],
	valid: new Set([]),
}

const categories = {
	required: ["name"],
	valid: new Set(["name"]),
}

module.exports = {
	users,
	coupons,
	categories,
}
