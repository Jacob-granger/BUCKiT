import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import {
  addANewTask,
  deleteTask,
  fetchTodos,
  updateTask,
} from '../apis/todosApi'
import {
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { setMaxListeners } from 'superagent'

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

  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

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

  function handleDel(id: number) {
    deleteTaskMutation.mutate(id)
  }

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

  console.log(todos)
  return (
    <>
      <VStack spacing="50px">
        <Heading as="h2" size="lg">
          {todos[0].location}
        </Heading>
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
            <Button
              mt="32px"
              bg="green"
              color="white"
              type="submit"
              _hover={{
                backgroundColor: 'green.600',
              }}
            >
              Add
            </Button>
          </Flex>
        </form>
        {todos.length === 1 && todos[0].id === null ? (
          <>
            <Heading as="h3" size="md">
              You havent added any todos yet!
            </Heading>
            <Button
              mt="80px"
              as="a"
              href="/"
              bg="#0147AB"
              color="white"
              _hover={{
                backgroundColor: 'blue.600',
              }}
            >
              Back
            </Button>
          </>
        ) : (
          <>
            <Heading as="h3" size="md">
              Checklist:
            </Heading>
            <Center mt="10px">
              <VStack alignItems="flex-start">
                {todos.map((task) => {
                  return (
                    <Flex key={task.todo_id}>
                      <Checkbox
                        mb="20px"
                        mr="10px"
                        key={task.todo_id}
                        isChecked={task.complete}
                        onChange={() =>
                          handleCheck(task.todo_id, task.complete)
                        }
                      >
                        <Text>{task.todo}</Text>
                      </Checkbox>
                      <Button
                        _hover={{
                          backgroundColor: 'red.400',
                        }}
                        onClick={() => handleDel(task.todo_id)}
                        size="xs"
                        bg="#cd2026"
                        color="white"
                        fontSize="1em"
                      >
                        <strong>x</strong>
                      </Button>
                    </Flex>
                  )
                })}
                <Button
                  mt="80px"
                  as="a"
                  href="/"
                  bg="#0147AB"
                  color="white"
                  _hover={{
                    backgroundColor: 'blue.600',
                  }}
                >
                  Back
                </Button>
              </VStack>
            </Center>
          </>
        )}
      </VStack>
    </>
  )
}
