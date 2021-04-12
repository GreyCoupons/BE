// Update with your config settings.
require("dotenv").config()

module.exports = {
	development: {
		client: process.env.DB_CLIENT || "pg",
		connection: process.env.DATABASE_URL || {
			database: "postgres",
			user: "postgres",
			password: "idontknow",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
		useNullAsDefault: true,
	},
	production: {
		client: process.env.DB_CLIENT || "pg",
		connection: process.env.DATABASE_URL,
		ssl=true,
		migrations: {
			tableName: "knex_migrations",
		},
	},
}
