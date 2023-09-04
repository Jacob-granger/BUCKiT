export interface Destination {
  id: number
  location: string
  duration_days: number
}

export interface DestinationData {
  location: string
  duration_days: number
}

export interface Todo {
  location: string
  todo_id: number
  id: number
  todo: string
  complete: boolean
}

export interface TodoData {
  id: number
  todo: string
  complete: boolean
}

export interface Task {
  id: number
  complete: boolean
}
