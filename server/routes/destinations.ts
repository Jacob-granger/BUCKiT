import express from 'express'
import * as db from '../db/destinations'
import { DestinationData } from '../../models/destinations'

const router = express.Router()

// GET /api/v1/destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await db.getAllDestinations()
    res.json(destinations)
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
})

// POST /api/v1/destinations
router.post('/', async (req, res) => {
  try {
    const newDest = req.body as DestinationData
    const destination = await db.addDestination(newDest)
    res.json(destination)
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const success = await db.deleteDestination(id)
  res.json(success)
})

export default router
