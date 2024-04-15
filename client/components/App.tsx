import { Center, Heading, Text } from '@chakra-ui/react'
import { Link, Outlet } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <>
      <ChakraProvider>
        <Center mb={50}>
          <header className="header">
            <Heading as="h1" size="xl" mt="4rem">
              BUCKiT
            </Heading>
          </header>
        </Center>

        <section className="main">
          <Outlet />
        </section>
      </ChakraProvider>
    </>
  )
}

export default App
