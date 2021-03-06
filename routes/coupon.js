//IMPORTS
const model = require("../config/models")
const mw = require("../middleware")
const { log_error } = require("../tools/errors")
const axios = require("axios")

const normalizedPath = require("path").join(
	__dirname,
	"../googleSheets/keys.json"
)
const fs = require("fs")
const { google } = require("googleapis")

// const keys = require("../googleSheets/keys.json")
//GLOBALS
const TABLE = "coupons"

module.exports = (app) => {
	app.get("/", welcome)
	app.post(
		"/add/coupon",
		mw.valid_coupon,
		mw.get_category_id,
		mw.get_featured_id,
		add_coupon
	),
		app.post("/coupons", mw.destructure_coupon, get_coupons),
		app.post("/remove/coupon", mw.destructure_coupon, remove_coupons),
		app.post("/get/featured", getFeatured),
		app.get("/api/loadcoupons", loadCoupons),
		app.get("/api/removeExpired", removeExpired)
}

const welcome = (req, res) => {
	res.status(200).send("Welcome")
}
const loadCoupons = async (req, res) => {
	// Importing Google File
	const googleAPI = require("../googleSheets")

	// Creates/Verifies Google Token, then sends token to the couponData function
	await fs.readFile(normalizedPath, (err, content) => {
		if (err) return console.log("Error loading client secret file:", err)
		// Authorize a client with credentials, then call the Google Sheets API.
		googleAPI.authorize(JSON.parse(content), couponData)
	})

	// stores all the coupons retrieved from google sheets
	let coupons = []

	// Retrieves google Sheets data
	async function couponData(auth) {
		const sheets = google.sheets({ version: "v4", auth })

		await sheets.spreadsheets.values.get(
			{
				spreadsheetId: "1x_PgDjeZ0UMk6wYGASQcnOFEMYXfRzWU22pnqNz-nP8",
				// Gets each rows value, from start row cell, to the end row cell.
				range: "A4:J100",
			},
			(err, res) => {
				if (err) return console.log("The API returned an error: " + err)
				const rows = res.data.values
				if (rows.length) {
					// Print columns A and E, which correspond to indices 0 and 4.
					rows.map((row) => {
						console.log(row, "DAAATAAAAAAAA")
						// putting the data in the json format to send to the backend laterz
						coupons.push({
							title: row[0],
							code: row[1],
							link: row[2],
							price: row[3],
							discount: row[4],
							expirationDate: row[5],
							category: row[6],
							imageAddress: row[7],
							featured: row[8],
							rating: row[9],
						})
					})
					// Sends over the google sheets data to the function to add to db
					sendRocketShip(coupons)
				} else {
					console.log("No data found.")
				}
			}
		)
	}
}

const sendRocketShip = async (couponData) => {
	await couponData.map((coupon) => {
		// Janky ass fix to send the google data to the add coupon database
		axios
			.post(
				// Production endpoint
				"https://greycoupon-test.herokuapp.com/add/coupon",
				// Testing endpoint, REMEMBER TO COMMENT OUT
				// "http://localhost:3333/add/coupon",
				coupon
			)
			.then((res) => {
				console.log("Successfully added coupon")
				// res.status(200).send("successfully loaded coupon")
			})
			.catch((err) => {
				console.log(err, coupon)
				// res.status(400).send(err)
			})
	})
}

const getFeatured = async (req, res) => {
	let status = req.flags.success ? 200 : 400
	const REQUEST_TYPE = "get"
	let featured = null

	try {
		// const { id: coupon_id } = await model.post("coupon_featured", req)
		featured = await model.get_featured({
			query: req.body,
			featured: req.featured,
			limit: req.limit,
		})
		response = featured
		status = 200
	} catch (err) {
		log_error("DATABASE ERROR", REQUEST_TYPE, err.code, TABLE, req)
		console.log(err.message)
		status = 400
	}
	res.status(status).send(response)
}

const sendCoupon = async (req, res) => {
	const REQUEST_TYPE = "post"
	//HIT DATABASE
	let status
	try {
		const { id: coupon_id } = await model.post(TABLE, req)
		await model.post("coupon_categories", {
			coupon_id,
			category_id: req.category_id,
		})
		req.category = req.category.name
		status = 200
	} catch (err) {
		log_error("DATABASE ERROR", REQUEST_TYPE, err.code, TABLE, req)
		console.log(err.message)
		status = 400
	}

	//SEND RESPONSE
	res.status(status).send(response)
}

const remove_coupons = async (req, res) => {
	//SET GLOBAL VARIABLE
	const REQUEST_TYPE = "delete"
	let status = req.flags.success ? 200 : 400
	let coupons_removed = 0

	if (req.flags.success) {
		try {
			coupons_removed = await model.remove_coupons({
				query: req.body,
				category: req.category,
			})
			console.log(coupons_removed)
		} catch (err) {
			console.log("nope")
		}
	}

	//PREPARE RESPONSE
	let response = { coupons_removed }
	if (req.flags.errors) response.errors = req.errors

	//SEND RESPONSE
	res.status(status).send(response)
}

const get_coupons = async (req, res) => {
	//SET GLOBAL VARIABLES
	const REQUEST_TYPE = "get"
	let status = req.flags.success ? 200 : 400
	let coupons = null
	let coupons_found = 0

	//HIT DATABASE
	if (req.flags.success) {
		try {
			coupons = await model.get_coupons({
				query: req.body,
				category: req.category,
				limit: req.limit,
			})
			coupons_found = coupons.length
		} catch (err) {
			log_error("DATABASE ERROR", REQUEST_TYPE, err.code, TABLE, req.body)
			console.log(err.message)
			req.flags.success = false
			status = 400
			req.errors.database = err.code
		}
	}

	//PREPARE RESPONSE
	let response = {}
	if (req.flags.errors) response.errors = req.errors
	if (coupons) {
		response.coupons_found = coupons_found
		response.coupons = coupons
	}

	//SEND RESPONSE
	res.status(status).send(response)
}

const add_coupon = async (req, res) => {
	const REQUEST_TYPE = "post"

	//HIT DATABASE
	if (req.flags.success) {
		try {
			const { id: coupon_id } = await model.post(TABLE, req.body)
			await model.post("coupon_categories", {
				coupon_id,
				category_id: req.category_id,
			})
			if (req.featured.name.toString() === "yes") {
				await model.post("coupon_featured", {
					coupon_id,
					featured_id: req.featured_id,
				})
				req.body.featured = req.featured.name
			}
			req.body.category = req.category.name
		} catch (err) {
			log_error("DATABASE ERROR", REQUEST_TYPE, err.code, TABLE, req.body)
			console.log(err.message)
			req.flags.success = false
			req.errors.database = err.code
		}
	}

	//PREPARE RESPONSE
	const status = req.flags.success ? 200 : 400
	const response = { success: req.flags.success }
	if (req.flags.success) response.data = req.body //return what was added
	if (req.flags.errors) response.errors = req.errors //return any errors

	//SEND RESPONSE
	res.status(status).send(response)
}

const removeExpired = async (req, res) => {
	const REQUEST_TYPE = "post"

	let status = req.flags.success ? 200 : 400
	var today = new Date()
	var dd = String(today.getDate()).padStart(2, "0")
	var mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
	var yyyy = today.getFullYear()

	today = mm + "/" + dd + "/" + yyyy

	try {
		removedCoupon = await model.removeExpired({
			query: today,
		})
		status = 200
		response = removedCoupon
	} catch (err) {
		console.log(err, "NOPE")
		status = 400
	}

	res.status(status).send(response)
}
