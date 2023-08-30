import { useQuery } from '@tanstack/react-query'
import { getDestinations } from '../apis/destinations'
import { Destination } from '../../models/destinations'
import DestinationItem from './DestinationItem'
import { Center, VStack } from '@chakra-ui/react'
import DestinationForm from './DestinationForm'

export default function DestinationsList() {
  const {
    data: destinations,
    isError,
    isLoading,
  } = useQuery(['destinations'], getDestinations)

  if (isError) {
    return <div>Whoops there was an error trying to load you destinations</div>
  }

  if (!destinations || isLoading) {
    return (
      <Center>
        <div>Loading Destinations</div>
      </Center>
    )
  }

  return (
    <>
      <Center mb={10}>
        <h2>
          Here&apos;s your current bucket list of destinations to travel to:
        </h2>
      </Center>

      <Center>
        <VStack spacing={4} width="30%">
          <DestinationForm />
          {destinations.map((dest: Destination) => {
            return (
              <DestinationItem
                key={dest.id}
                location={dest.location}
                duration={dest.duration_days}
                id={dest.id}
              />
            )
          })}
        </VStack>
      </Center>
    </>
  )
}
