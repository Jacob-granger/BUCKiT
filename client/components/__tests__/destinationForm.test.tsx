// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderRoute } from '../../test/setup.tsx'
import nock from 'nock'
import { waitFor, within } from '@testing-library/react'

describe('Adding destinations', () => {
  it('Shows inital items in destination collection', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/destinations')
      .reply(200, [
        {
          id: 1,
          location: 'Bali',
          duration_days: 5,
        },
        {
          id: 2,
          location: 'India',
          duration_days: 7,
        },
        {
          id: 3,
          location: 'Vietnam',
          duration_days: 5,
        },
      ])

    const screen = renderRoute('/')

    const destinations = await screen.findByText(/Bali/)
    expect(destinations).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it('Adds a new Destination', async () => {
    const initialLoadScope = nock('http://localhost')
      .get('/api/v1/destinations')
      .reply(200, [
        {
          id: 1,
          location: 'Bali',
          duration_days: 5,
        },
        {
          id: 2,
          location: 'India',
          duration_days: 7,
        },
        {
          id: 3,
          location: 'Vietnam',
          duration_days: 5,
        },
      ])

    const { user, ...screen } = renderRoute('/')

    await waitFor(() => {
      expect(screen.queryByText(/Loading/)).not.toBeInTheDocument()
    })

    expect(initialLoadScope.isDone()).toBe(true)

    const form = screen.getByRole('form')
    const locationField = within(form).getByLabelText('Destination:')
    const durationField = within(form).getByLabelText('Duration:')
    const submit = within(form).getByRole('button')

    const addDestination = nock('http://localhost')
      .post('/api/v1/destinations', {
        location: 'Cambodia',
        duration_days: '6',
      })
      .reply(200, { id: 4, location: 'Cambodia', duration_days: 6 })

    await user.type(locationField, 'Cambodia')
    await user.type(durationField, '6')
    await user.click(submit)

    await waitFor(() => {
      expect(
        screen.queryByText(/Adding your new destination/)
      ).not.toBeInTheDocument()
    })

    const cambodiaEntry = await screen.findByText(/Cambodia/)
    expect(cambodiaEntry).toBeInTheDocument()
    expect(addDestination.isDone()).toBe(true)
  })

  // const newScreen = renderRoute('/')

  // await waitFor(() => {
  //   expect(newScreen.queryByLabelText('Loading...')).not.toBeInTheDocument()
  // })

  // const pokemon = newScreen.getByText(/Pikachu/)

  // const addedPokemon = nock('http://localhost')
  //   .get('/api/v1/pokemon')q
  //   .reply(200, [
  //     {
  //       id: 4,
  //       name: 'Jacob',
  //     },
  //     {
  //       id: 5,
  //       name: 'Charmeleon',
  //     },
  //     {
  //       id: 6,
  //       name: 'Charizard',
  //     },
  //     {
  //       id: 154,
  //       name: 'Pikachu',
  //     },
  //   ])
  // const newScreen = renderRoute('/')

  // expect(addedPokemon.isDone()).toBe(true)

  // console.log(pokemon)
  // expect(pokemon).toBeInTheDocument()
})
