import { Center } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <>
      <ChakraProvider>
        <Center mb={50}>
          <header className="header">
            <h1>Bucket List</h1>
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
