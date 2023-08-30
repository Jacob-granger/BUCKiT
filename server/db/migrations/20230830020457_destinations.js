export function up(knex) {
  return knex.schema.createTable('destinations', (table) => {
    table.increments('id')
    table.string('location')
    table.integer('duration_days')
  })
}

export function down(knex) {
  return knex.schema.dropTable('destinations')
}
