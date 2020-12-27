const { get_one: get, post } = require("../config/models")

const get_category_id = async (req, res, next) => {
	//DONT TOUCH DATABASE IF POST IS A FAILURE
	if (!req.flags.success) {
		next()
		return
	}

	//CHECK IF CATEGORY ALREADY EXISTS
	//---A list can probably be stored and updated in memory
	const category = await get("categories", req.category)

	//STORE CATEGORY ID IN REQ
	if (category) req.category_id = category.id
	else {
		req.category_id = (await post("categories", req.category)).id
		req.added.add("category")
	}
	next()
}

module.exports = {
	get_category_id,
}
