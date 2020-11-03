// Update with your config settings.
require('dotenv').config()

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            database: 'test',
            user: 'q',
            password: 'idontknow'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
}