import { Task, Todo } from '../../models/destinations.ts'
import db from './connection.ts'

export async function getAllTodos(id: number): Promise<Todo[]> {
  const todos = await db('todos').where('id', id).select('*')
  return todos
}

export async function addTodo(task: Todo) {
  const result = await db('todos').insert(task)
  return result
}

export async function updateTodo(update: Task) {
  console.log(update)
  await db('todos')
    .where('todo_id', update.id)
    .update('complete', update.complete)
}
