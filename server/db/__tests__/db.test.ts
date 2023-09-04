import * as db from '../destinations.ts'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection.ts'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

describe('addDestinaion', () => {
  it('adds a new destination to the database', async () => {
    const newDest = { location: 'Bali', duration_days: 6 }
    const result = { id: 4, location: 'Bali', duration_days: 6 }

    const destination = await db.addDestination(newDest)
    const allDestinations = await db.getAllDestinations()

    expect(destination).toEqual(result)
    expect(allDestinations).toHaveLength(4)
    expect(destination.location).toEqual('Bali')
    expect(destination.duration_days).toEqual(6)
  })
})

afterAll(() => {
  connection.destroy()
})
