import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDestination } from '../apis/destinations'
import { DestinationData } from '../../models/destinations'
import { useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'

const initialFormData = {
  location: '',
  duration_days: 0,
}

export default function DestinationForm() {
  const [form, setForm] = useState<DestinationData>(initialFormData)
  const queryClient = useQueryClient()

  const destMutation = useMutation(addDestination, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['destinations'])
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
      {/* <form onSubmit={handleSubmit} aria-label="Add Destination From">
        <label htmlFor="location">Destination:</label>
        <input
          id="location"
          name="location"
          onChange={handleChange}
          value={form.location}
        />
        <label htmlFor="duration">Duration:</label>
        <input
          id="duration_days"
          name="duration_days"
          onChange={handleChange}
          value={form.duration_days}
        />
        <button>Submit</button>
      </form> */}
      <Box p={4} maxWidth="400px" mx="auto" mt={8}>
        <form onSubmit={handleSubmit} aria-label="Add Destination Form">
          <FormControl>
            <FormLabel htmlFor="location">Destination:</FormLabel>
            <Input
              type="text"
              id="location"
              name="location"
              onChange={handleChange}
              value={form.location}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="duration_days">Duration:</FormLabel>
            <Input
              type="number"
              id="duration_days"
              name="duration_days"
              onChange={handleChange}
              value={form.duration_days}
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </>
  )
}
