import { Task, Todo } from '../../models/destinations.ts'
import db from './connection.ts'

// export async function getAllTodos(id: number): Promise<Todo[]> {
//   const todos = await db('todos').where('id', id).select('*')
//   return todos
// }

export async function getAllTodos(id: number): Promise<Todo[]> {
  const todos = await db('todos')
    .where('destinations.id', id)
    .select(
      'todos.todo_id',
      'todos.id',
      'todos.todo',
      'todos.complete',
      'destinations.location'
    )
    .rightJoin('destinations', 'todos.id', 'destinations.id')
  console.log(todos)
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

export async function deleteTodo(id: number) {
  const result = await db('todos').where('todo_id', id).del()
  return result
}
