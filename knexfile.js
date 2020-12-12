// Update with your config settings.
require("dotenv").config();

module.exports = {
	development: {
		client: "pg",
		connection: process.env.DATABASE_URL,
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
	production: {
		production: {
			client: "pg",
			connection: process.env.DATABASE_URL,
			migrations: {
				directory: "knex_migrationss",
			},
		},
	},
};
