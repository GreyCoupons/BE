exports.up = (knex) => {
	return knex.schema.createTable("coupons", (table) => {
		table.increments("id").primary().unique().notNullable();
		table.text("title").notNullable();
		table.text("description");
		table.text("code");
		table.text("link");
		table.decimal("price", 6, 2);
		table.decimal("discount", 6, 2);
		table.text("hash").notNullable();
		table.binary("image");
		table.bigint("timestamp").notNullable();
	});
};

exports.down = (knex) => knex.schema.dropTableIfExists("coupons");
