import db from './connection.ts'

import { Destination, DestinationData } from '../../models/destinations.ts'

//get all destinations
export async function getAllDestinations(): Promise<Destination[]> {
  const destinations = await db('destinations').select('*')
  return destinations
}

//add destination
export async function addDestination(
  newDest: DestinationData
): Promise<Destination> {
  const destination = await db('destinations').insert(newDest).returning('*')
  return destination[0]
}

//delete destination
export async function deleteDestination(id: number) {
  const result = await db('destinations').where('id', id).del()
  return result
}
