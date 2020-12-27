exports.up = function (knex) {
	return knex.schema.createTable("featured", (table) => {
		table.increments("id").primary().unique().notNullable()
		table.text("name").unique().notNullable()
	})
}

exports.down = (knex) => knex.schema.dropTableIfExists("featured")
