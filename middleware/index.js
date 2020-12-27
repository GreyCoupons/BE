//GLOBAL

const add_flags = (req, res, next) => {
	req.flags = { success: true, errors: false }
	req.added = new Set([])
	req.errors = {}
	next()
}

module.exports = {
	add_flags,
	...require("./coupons"),
	...require("./categories"),
	...require("./featured"),
}
