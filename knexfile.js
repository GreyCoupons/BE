// Update with your config settings.
require("dotenv").config();

module.exports = {
	development: {
		client: "postgresql",
		connection: {
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
	},
	production: {
		client: "pg",
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: __dirname + "/db/migrations",
		},
	},
};
