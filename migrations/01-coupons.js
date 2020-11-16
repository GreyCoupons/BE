exports.up = (knex) => {
    return knex.schema.createTable('coupons', table => {
        table.increments('id')
            .primary()
            .unique()
            .notNullable()
        table.text('title')
            .notNullable()
        table.text('code')
            .notNullable()
        table.text('expiration')
        table.decimal('price',6,2)
        table.decimal('discount',2,2)
        table.text('hash')
            .notNullable()
        table.binary('image')
    })
}

exports.down = (knex) =>
    knex.schema.dropTableIfExists('coupons')