import { useParams } from 'react-router-dom'

export default function Trip() {
  const trip = useParams()
  console.log(trip)
  return (
    <>
      <h1>Plan your trip!</h1>
    </>
  )
}
