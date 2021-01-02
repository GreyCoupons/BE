const { get_one: get, post } = require("../config/models")

const get_featured_id = async (req, res, next) => {
	//DONT TOUCH DATABASE IF POST IS A FAILURE
	if (!req.flags.success) {
		next()
		return
	}
	//CHECK IF FEATURED ALREADY EXISTS
	//---A list can probably be stored and updated in memory
	const featured = await get("featured", req.featured)

	//STORE FEATURED ID IN REQ
	if (featured) req.featured_id = featured.id
	else {
		req.featured_id = (await post("featured", req.featured)).id
		req.added.add("featured")
	}
	next()
}

module.exports = {
	get_featured_id,
}
