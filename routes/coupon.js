//IMPORTS
const model = require("../config/models");
const mw = require("../middleware");
const { log_error } = require("../tools/errors");


// const keys = require("../googleSheets/keys.json")
//GLOBALS
const TABLE = "coupons";

module.exports = (app) => {
    app.post("/add/coupon", mw.valid_coupon, mw.get_category_id, add_coupon),
        app.post("/coupons", mw.destructure_coupon, get_coupons),
        app.post("/remove/coupon", mw.destructure_coupon, remove_coupons);
    app.get("/", welcome)
};

const welcome = async (req, res) => {
    // googleAPI
    const googleAPI = require("../googleSheets")
    console.log(googleAPI)
    res.status(200).send("Welcome!");
}

const remove_coupons = async (req, res) => {

    //SET GLOBAL VARIABLE
    const REQUEST_TYPE = "delete";
    let status = req.flags.success ? 200 : 400;
    let coupons_removed = 0;

    if (req.flags.success) {
        try {
            coupons_removed = await model.remove_coupons({
                query: req.body,
                category: req.category,
            });
            console.log(coupons_removed);
        } catch (err) {
            console.log("nope");
        }
    }

    //PREPARE RESPONSE
    let response = { coupons_removed };
    if (req.flags.errors) response.errors = req.errors;

    //SEND RESPONSE
    res.status(status).send(response);
};

const get_coupons = async (req, res) => {
    //SET GLOBAL VARIABLES
    const REQUEST_TYPE = "get";
    let status = req.flags.success ? 200 : 400;
    let coupons = null;
    let coupons_found = 0;

    //HIT DATABASE
    if (req.flags.success) {
        try {
            coupons = await model.get_coupons({
                query: req.body,
                category: req.category,
                limit: req.limit,
            });
            coupons_found = coupons.length;
        } catch (err) {
            log_error("DATABASE ERROR", REQUEST_TYPE, err.code, TABLE, req.body);
            console.log(err.message);
            req.flags.success = false;
            status = 400;
            req.errors.database = err.code;
        }
    }

    //PREPARE RESPONSE
    let response = {};
    if (req.flags.errors) response.errors = req.errors;
    if (coupons) {
        response.coupons_found = coupons_found;
        response.coupons = coupons;
    }

    //SEND RESPONSE
    res.status(status).send(response);
};

const add_coupon = async (req, res) => {
    const REQUEST_TYPE = "post";

    //HIT DATABASE
    if (req.flags.success) {
        try {
            const { id: coupon_id } = await model.post(TABLE, req.body);
            await model.post("coupon_categories", {
                coupon_id,
                category_id: req.category_id,
            });
            req.body.category = req.category.name;
        } catch (err) {
            log_error("DATABASE ERROR", REQUEST_TYPE, err.code, TABLE, req.body);
            console.log(err.message);
            req.flags.success = false;
            req.errors.database = err.code;
        }
    }

    //PREPARE RESPONSE
    const status = req.flags.success ? 200 : 400;
    const response = { success: req.flags.success };
    if (req.flags.success) response.data = req.body; //return what was added
    if (req.flags.errors) response.errors = req.errors; //return any errors

    //SEND RESPONSE
    res.status(status).send(response);
};
