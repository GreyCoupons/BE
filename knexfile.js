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
		connection: {
			host: "ec2-18-206-103-49.compute-1.amazonaws.com",
			database: "ddp1gk0tdj9d48",
			user: "bsruhiqeavvuaj",
			password:
				"f537a1e39361d5f1dd98661b9a373b753470e858a7f69546612c3ce7e8548432",
			ssl: {
				rejectUnauthorized: false,
			},
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
}
