export async function seed(knex) {
  // Deletes ALL existing entries
  return await knex('destinations').del()
}
