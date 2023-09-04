import { Center, Heading, Text } from '@chakra-ui/react'
import { Link, Outlet } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <>
      <ChakraProvider>
        <Center mb={50}>
          <header className="header">
            <Heading as="h1" size="xl">
              <Link to="/">Bucket List</Link>
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
