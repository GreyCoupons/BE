exports.up = (knex) => {
    return knex.schema.createTable('coupon_categories', table => {
        table.increments('id')
            .primary()
            .unique()
            .notNullable()
        table.integer('coupon_id')
            .references('id')
            .inTable('coupons')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table.integer('category_id')
            .references('id')
            .inTable('categories')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
}

exports.down = (knex) =>
    knex.schema.dropTableIfExists('coupon_categories')