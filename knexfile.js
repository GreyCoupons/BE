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
		production: {
			client: "pg",
			connection: process.env.DATABASE_URL,
			migrations: {
				directory: "./data/migrations",
			},
			seeds: { directory: "./data/seeds" },
		},
	},
};
