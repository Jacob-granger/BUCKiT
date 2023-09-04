import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDestination } from '../apis/destinations'
import { Destination, DestinationData } from '../../models/destinations'
import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'

const initialFormData = {
  location: '',
  duration_days: 0,
}

export default function DestinationForm() {
  const [form, setForm] = useState<DestinationData>(initialFormData)
  const queryClient = useQueryClient()

  const destMutation = useMutation(addDestination, {
    onSuccess: async (newDest) => {
      const currDestinations: Destination[] | undefined =
        queryClient.getQueryData(['destinations'])
      if (currDestinations) {
        queryClient.setQueryData(
          ['destinations'],
          [...currDestinations, newDest]
        )
      } else {
        queryClient.invalidateQueries(['destinations'])
      }
    },
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    destMutation.mutate(form)
    setForm(initialFormData)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  if (destMutation.isLoading) {
    return <div>Adding your new destination</div>
  }

  return (
    <>
      <Box p={4} maxWidth="400px" mx="auto">
        <form onSubmit={handleSubmit} aria-label="Add Destination Form">
          {destMutation.isError && (
            <h3>
              Whoops something went wrong while adding a new destination to you
              bucket list
            </h3>
          )}
          <Flex>
            <FormControl mr={4}>
              <FormLabel htmlFor="location">Destination:</FormLabel>
              <Input
                type="text"
                id="location"
                name="location"
                onChange={handleChange}
                value={form.location}
              />
            </FormControl>
            <FormControl mr={4}>
              <FormLabel htmlFor="duration_days">Duration (days):</FormLabel>
              <Input
                id="duration_days"
                type="number"
                name="duration_days"
                onChange={handleChange}
                value={form.duration_days}
              />
            </FormControl>
            <Button
              mt={30}
              bg="green"
              _hover={{
                backgroundColor: 'green.600',
              }}
              color="white"
              type="submit"
            >
              Add
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  )
}
