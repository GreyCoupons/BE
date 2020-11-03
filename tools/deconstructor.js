const table_schema = {
    _special_fields: new Set(['limit']),
    coupons: {
        required: ['title', 'code'],
        valid: new Set(['title','code','expiration','price','discount','image','timestamp'])
    },
    users: {
        required: ['username'],
        valid: new Set(['username'])
    }
}
const db = require('../config/db')

const object_is_empty = (obj) =>
    Object.keys(obj).length === 0 && obj.constructor === Object

const remove_empty_tables = (tbls) => {
    for (const key in tbls) if (object_is_empty(tbls[key])) delete tbls[key]
}

const tables_are_valid = (obj) => {
    errors = []
    // ensure the tables in data correlate to tables in the database
    for(const tbl in obj)
        if (!(tbl in table_schema)) {
            errors.push(`${tbl} is not a valid table`)
            delete obj[tbl]
        }
    return errors
}
const has_all_required_fields = (data) => {
    missing_fields = []
    for(const tbl_key in data) {
        let err_flag = false
        const tbl_schema = table_schema[tbl_key]
        // check each table to ensure all the required fields are provided
        for(const field_key in tbl_schema.required) {
            if(tbl_schema.required[field_key] in data[tbl_key]) continue
            missing_fields.push(`${tbl_schema.required[field_key]} field is missing from ${tbl_key}`)
            err_flag = true
        }
        // if a required field was missing; remove the table from the data
        if (err_flag) delete data[tbl_key]
    }
    return missing_fields
}

const remove_extra_fields = (data) => {
    extra_fields = []
    for(const tbl_key in data) {
        const tbl_schema = table_schema[tbl_key]
        for(const field_key in data[tbl_key]) {
            if (tbl_schema.valid.has(field_key) || table_schema._special_fields.has(field_key)) continue
            delete data[tbl_key][field_key]
            extra_fields.push(`${field_key} was removed from ${tbl_key}`)
        }
    }
    return extra_fields
}

const post = async (tbl, obj) =>
    await db(tbl).insert(obj)

const get = async (obj) => {
    if('limit' in obj.special)
        return await db(obj.table).select(obj.include).where(obj.filter).limit(obj.special.limit)
    else
        return await db(obj.table).select(obj.include).where(obj.filter)
}

const post_to_db = async (data) => {
    if (!data) return null

    // check for errors with input data
    const invalid_table_errors = tables_are_valid(data)
    const missing_required_fields = has_all_required_fields(data)
    const removed_fields = remove_extra_fields(data)
    const errors = [
        ...invalid_table_errors,        //removes invalid tables
        ...missing_required_fields,     //checks if all required fields are present
        ...removed_fields               //removes extra fields from tables
    ]
    // if there's not enough data to make a post to the database
    // skip to sending the response
    if (object_is_empty(data)) {
        if(errors.length) return {errors: errors, posted: false}
        return {posted: false}
    } else {
        for (const tbl in data) {
            try {
                await post(tbl, data[tbl])
            }
            catch (err) {
                errors.push(err.message)
                return {errors: errors, posted: false}
            }
        }
    }
    console.log(errors, errors.length)

    // make post resquest to db
    data.timestamp = new Date().toISOString()
    if(errors.length) {
        console.log('made it here')
        return {errors: errors, posted: true}
    }
    return {posted: true}
}

const split_query = data => {
    let queries = []
    for (const tbl_key in data) {
        let query = {
            table: tbl_key,
            include: [],
            filter: {},
            special: {}
        }
        for (const field_key in data[tbl_key]) {
            if (table_schema._special_fields.has(field_key)) {
                query.special[field_key] = data[tbl_key][field_key]
            }
            else if (typeof data[tbl_key][field_key] === 'string') {
                switch (data[tbl_key][field_key][0]) {
                    /* * include this in response                */
                    /* ! only filter, don't return this field    */
                    case '*': query.include.push(field_key); break
                    case '!': query.filter[field_key] = data[tbl_key][field_key].substring(1); break
                    default: 
                        query.include.push(field_key)
                        query.filter[field_key] = data[tbl_key][field_key]
                }
            }
        }
        queries.push(query)
    }
    return queries
}

const get_data = async (query) => {
    const invalid_table_errors = tables_are_valid(query)
    const nonexistant_field_errors = remove_extra_fields(query)
    const errors = [
        ...invalid_table_errors,
        ...nonexistant_field_errors
    ]
    remove_empty_tables(query)
    query = split_query(query)
    let response = {}
    for(const tbl in query) {
        response[query[tbl].table] = await get(query[tbl])
    }
    response.errors = errors
    return response
}

exports.deconstruct = async (req,res) => {
    let post_results = await post_to_db(req.body.data)
    console.log('pr', post_results)
    let query_results = await get_data(req.body.query)
    const response = {}
    if(post_results) response.post_results = post_results
    if(query_results) response.query_results = query_results
    // console.log(response)
    res.status(200).send(response)
}

// NOW DO QUERY