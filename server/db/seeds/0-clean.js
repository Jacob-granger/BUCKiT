export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('destinations').del()
  await knex('todos').del()
}
