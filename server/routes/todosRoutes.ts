import express from 'express'
import * as db from '../db/todos'
import { Todo } from '../../models/destinations'

const router = express.Router()

// GET /api/v1/todos/:id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const todos = await db.getAllTodos(id)
    res.json(todos)
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
})

// POST /api/v1/todos/:id
router.post('/:id', async (req, res) => {
  try {
    const newTask = req.body as Todo
    const result = await db.addTodo(newTask)
    res.json(result)
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
})

router.put('/', async (req, res) => {
  try {
    const update = req.body
    const updatedTodo = await db.updateTodo(update)
    res.json(updatedTodo)
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const success = await db.deleteTodo(id)
  res.json(success)
})

export default router
