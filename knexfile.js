// Update with your config settings.
require("dotenv").config()

module.exports = {
	development: {
		client: process.env.DB_CLIENT || "pg",
		connection: process.env.DATABASE_URL || {
			database: "test",
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
		migrations: {
			tableName: "knex_migrationss",
		},
	},
}
