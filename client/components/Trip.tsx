import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { addANewTask, fetchTodos, updateTask } from '../apis/todosApi'
import {
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function Trip() {
  const { id: tripId } = useParams()

  const initalFormData = {
    id: Number(tripId),
    todo: '',
    complete: false,
  }
  const [task, setTask] = useState(initalFormData)

  const queryClient = useQueryClient()

  const {
    data: todos,
    isError,
    isLoading,
  } = useQuery(['todos', tripId], () => fetchTodos(tripId))

  const addTaskMutation = useMutation(addANewTask, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const updateTaskMutation = useMutation(updateTask, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  if (isError) {
    return <div>Whoops there was an error trying to load your todos</div>
  }

  if (!todos || isLoading) {
    return (
      <Center>
        <div>Loading todos</div>
      </Center>
    )
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newTask = { ...task, [name]: value }
    setTask(newTask)
  }

  function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addTaskMutation.mutate(task)
    setTask(initalFormData)
  }

  function handleCheck(id: number, status: boolean) {
    const update = {
      id: id,
      complete: !status,
    }
    updateTaskMutation.mutate(update)
  }
  return (
    <>
      <VStack>
        <form onSubmit={handleAdd} aria-label="Add Todo Form">
          {addTaskMutation.isError && (
            <h3>Whoops something went wrong while adding a new task</h3>
          )}
          <Flex alignItems="center">
            <FormControl mr={4}>
              <FormLabel htmlFor="todo">New task</FormLabel>
              <Input
                type="text"
                id="todo"
                name="todo"
                onChange={handleChange}
                value={task.todo}
              />
            </FormControl>
            <Button mt="32px" bg="green" color="white" type="submit">
              Add
            </Button>
          </Flex>
        </form>
        {todos.length === 0 ? (
          <h2>You havent added any todos yet!</h2>
        ) : (
          <h2>Todo:</h2>
        )}
      </VStack>
      <Center mt="100px">
        <VStack alignItems="flex-start">
          {todos.map((task) => {
            return (
              <Checkbox
                key={task.todo_id}
                isChecked={task.complete}
                onChange={() => handleCheck(task.todo_id, task.complete)}
              >
                <Text>{task.todo}</Text>
              </Checkbox>
            )
          })}
        </VStack>
      </Center>
    </>
  )
}
