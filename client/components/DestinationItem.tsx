import { Button, Card, CardBody, HStack, Text } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteDestination } from '../apis/destinations'

interface Props {
  location: string
  duration: number
  id: number
}

export default function DestinationItem(props: Props) {
  const queryClient = useQueryClient()

  const deleteDestMutation = useMutation(deleteDestination, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['destinations'])
    },
  })

  function handleDelete(id: number) {
    deleteDestMutation.mutate(id)
  }

  if (deleteDestMutation.isLoading) {
    return <div>Deleting...</div>
  }

  return (
    <>
      <Card bg="#FF9E3D" width="50%">
        <CardBody>
          <HStack justifyContent="space-between">
            <Text>
              {props.location}: {props.duration} days
            </Text>
            <Button onClick={() => handleDelete(props.id)} fontSize={15}>
              Delete
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </>
  )
}
