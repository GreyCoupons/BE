const knex = require('knex')
const config = require('../knexfile')
const env = process.env.DB_ENV || 'development' //switch to production

module.exports = knex(config[env])