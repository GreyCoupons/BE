exports.up = (knex) => {
    return knex.schema.createTable('categories', table => {
        table.increments('id')
            .primary()
            .unique()
            .notNullable()
        table.text('name')
            .notNullable()
    })
}

exports.down = (knex) =>
    knex.schema.dropTableIfExists('categories')