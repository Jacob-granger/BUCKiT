export function up(knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('todo_id')
    table.integer('id')
    table.string('todo')
    table.boolean('complete')
  })
}

export function down(knex) {
  return knex.schema.dropTable('todos')
}
