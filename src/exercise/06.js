// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    async function fetch() {
      try {
        setError(null)
        setLoading(true)
        const pokemonDetails = await fetchPokemon(pokemonName)
        setPokemon(pokemonDetails)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setPokemon(null)
        setError(error)
      }
    }

    if (pokemonName) {
      fetch()
    }
  }, [pokemonName])

  return (
    <>
      {!!error?.message && (
        <div role="alert">
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        </div>
      )}
      {!pokemonName && 'Submit a pokemon'}
      {loading && <PokemonInfoFallback name={pokemonName} />}
      {!!pokemon?.id && <PokemonDataView pokemon={pokemon} />}
    </>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
