import { Center } from '@chakra-ui/react'
import DestinationsList from './DestinationsList'
import DestinationForm from './DestinationForm'

function App() {
  return (
    <>
      <Center mb={50}>
        <header className="header">
          <h1>My Collection</h1>
        </header>
      </Center>
      <section className="main">
        <DestinationsList />
      </section>
    </>
  )
}

export default App
