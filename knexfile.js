const { isRequiredArgument } = require("graphql");

require('dotenv').config()

module.exports = {
    developement: {
        client: 'postgres',
        connection: {
            host: provess.env.DB_HOST,
            user: provess.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds'
        }
    }
}