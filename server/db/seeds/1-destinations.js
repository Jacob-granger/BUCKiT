export async function seed(knex) {
  // Inserts seed entries
  return await knex('destinations').insert([
    { id: 1, location: 'Vietnam', duration_days: 5 },
    { id: 2, location: 'Cambodia', duration_days: 7 },
    { id: 3, location: 'Sri Lanka', duration_days: 7 },
  ])
}
