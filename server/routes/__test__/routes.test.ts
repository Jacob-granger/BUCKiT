import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import server from '../../server.ts'
import * as db from '../../db/destinations.ts'
import { DestinationData } from '../../../models/destinations.ts'

vi.mock('../../db/destinations.ts')

describe('POST /api/v1/destinations', () => {
  it('adds a new destination and returns a the destination added', async () => {
    vi.mocked(db.addDestination).mockImplementation(
      async (newDest: DestinationData) => {
        return { ...newDest, id: 4 }
      }
    )

    const newDest = { location: 'Bali', duration_days: 5 }
    const response = await request(server)
      .post('/api/v1/destinations')
      .send(newDest)

    expect(response.statusCode).toBe(200)
    expect(db.addDestination).toHaveBeenCalled()
    expect(db.addDestination).toHaveBeenCalledWith(newDest)
    expect(response.body.location).toEqual('Bali')
    expect(response.body).toMatchInlineSnapshot(`
      {
        "duration_days": 5,
        "id": 4,
        "location": "Bali",
      }
    `)
  })
  it('handles errors', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(db.addDestination).mockImplementation(async () => {
      throw new Error(
        'Something went wrong trying to add a new destination to the database'
      )
    })

    const newDest = { location: 'Bali', duration_days: 5 }
    const response = await request(server)
      .post('/api/v1/destinations')
      .send(newDest)

    expect(console.error).toHaveBeenCalled()
    expect(response.statusCode).toBe(500)
  })
})
