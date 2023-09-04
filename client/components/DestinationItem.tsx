import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteDestination, updateDest } from '../apis/destinations'
import { useState } from 'react'

interface Props {
  location: string
  duration_days: number
  id: number
}

export default function DestinationItem(props: Props) {
  const [editForm, setEditForm] = useState(props)
  const [edit, setEdit] = useState(false)

  function handleEditChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newEditForm = { ...editForm, [name]: value }
    setEditForm(newEditForm)
  }

  function handleEdit() {
    setEdit(!edit)
  }

  const queryClient = useQueryClient()

  const deleteDestMutation = useMutation(deleteDestination, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['destinations'])
    },
  })

  const updateDestMutation = useMutation(updateDest, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['destinations'])
    },
  })

  function handleSave() {
    updateDestMutation.mutate(editForm)
    setEdit(!edit)
  }

  function handleDelete(id: number) {
    deleteDestMutation.mutate(id)
  }

  if (deleteDestMutation.isLoading) {
    return <div>Deleting...</div>
  }

  return !edit ? (
    <>
      <Card bg="#C95B0c" width="50%">
        <CardBody>
          <VStack spacing="20px">
            <Text color="white" fontSize="1.5rem">
              {props.location}: {props.duration_days} days
            </Text>
            <HStack justifyContent="space-between" width="100%">
              <Button
                as="a"
                href={`/trip/${props.id}`}
                fontSize={10}
                width="25%"
              >
                Plan trip
              </Button>
              <Button onClick={handleEdit} fontSize={10} width="25%">
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(props.id)}
                fontSize={10}
                width="25%"
              >
                Delete
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </>
  ) : (
    <>
      <Card bg="#C95B0c" width="50%">
        <CardBody>
          <VStack spacing="20px">
            <form onSubmit={handleSave} aria-label="Edit destination form">
              {updateDestMutation.isError && (
                <h3>Whoops something went wrong trying to update this entry</h3>
              )}
              <FormControl>
                <FormLabel htmlFor="location">Destination:</FormLabel>
                <Input
                  type="text"
                  name="location"
                  onChange={handleEditChange}
                  value={editForm.location}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="duration_days">Duration (days):</FormLabel>
                <Input
                  type="number"
                  name="duration_days"
                  onChange={handleEditChange}
                  value={editForm.duration_days}
                />
              </FormControl>
              <Button fontSize={10} width="25%" type="submit">
                Save
              </Button>
            </form>
            <HStack justifyContent="space-between" width="100%"></HStack>
          </VStack>
        </CardBody>
      </Card>
    </>
  )
}
