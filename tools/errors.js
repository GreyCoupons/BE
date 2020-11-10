const red = (text='') => `\x1b[31m${text}\x1b[0m`

const log_error = (title=null, type=null, code=null, table=null, data=null) => {
    console.error(
        red('DATABASE ERROR'),
        {
            code: code,
            request_type: type,
            table: table,
            data: data
        })
}

module.exports = {
    log_error
}