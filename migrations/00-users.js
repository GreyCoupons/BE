exports.up = (knex) => {
    return knex.schema.createTable('users', table => {
        table.increments('id')
            .primary()
            .unique()
            .notNullable()
        table.text('username')
            .unique()
            .notNullable()
    })
}

exports.down = (knex) =>
    knex.schema.dropTableIfExists('users')