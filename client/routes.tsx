import { Route, createRoutesFromElements } from 'react-router-dom'

import DestinationsList from './components/DestinationsList.tsx'
import App from './components/App.tsx'

export const routes = createRoutesFromElements(
  <Route element={<App />}>
    <Route index element={<DestinationsList />} />
  </Route>
)
