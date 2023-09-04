import request from 'superagent'
import { Task, Todo, TodoData } from '../../models/destinations'

const apiUrl = '/api/v1/todos'

export async function fetchTodos(id: string): Promise<Todo[]> {
  const response = await request.get(`${apiUrl}/${id}`)
  return response.body
}

// Post /api/v1/todos:id
export async function addANewTask(task: TodoData) {
  const response = await request.post(`${apiUrl}/${task.id}`).send(task)
  return response.body
}

export async function updateTask(update: Task) {
  console.log('update', update)
  const response = await request.put(`${apiUrl}`).send(update)
  return response.body
}
