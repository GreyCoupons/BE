
const has_required_fields = (obj = {}, required = []) => {
    let missing_fields = []
    for(idx in required) 
        if(!(required[idx] in obj)) missing_fields.push(required[idx])
    if(missing_fields.length) return missing_fields
    return true
}

const remove_invalid_fields = (obj = {}, valid = Set()) => {
    let invalid_fields = []
    for(key in obj)
        if(!(valid.has(key))) {
            invalid_fields.push(key)
            delete obj[key]
        }
    if(invalid_fields.length) return invalid_fields
    return true
}

module.exports = {
    has_required_fields,
    remove_invalid_fields
}