import request from 'superagent'
import { Destination, DestinationData } from '../../models/destinations'

const apiUrl = '/api/v1/destinations'

// Get /api/v1/destinations
export async function getDestinations(): Promise<Destination[]> {
  const response = await request.get(apiUrl)
  return response.body
}

// Post /api/v1/destinations
export async function addDestination(
  newDest: DestinationData
): Promise<Destination> {
  const response = await request.post(apiUrl).send(newDest)
  return response.body
}

// Delete /api/v1/destinations
export async function deleteDestination(id: number) {
  await request.del(`${apiUrl}/${id}`)
  // return response.body
}
