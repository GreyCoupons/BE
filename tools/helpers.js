
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

const pop_object = (obj, key) => {
    const val = obj[key]
    delete obj[key]
    return val
}

const hash_object = (obj) => {
    const str = JSON.stringify(obj)
    var hash = 0;
    if (str.length == 0) {
        return hash;
    }
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

module.exports = {
    has_required_fields,
    remove_invalid_fields,
    pop_object,
    hash_object
}