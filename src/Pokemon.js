import {useEffect, useState} from "react";
import {fetchFromURL} from "./FetchFromURL";
import {capitalizeFirst} from "./FormatFunctions";
import {PokemonDamageRelations} from "./PokemonDamageRelations";

const baseURL = `https://pokeapi.co/api/v2`

export function Pokemon(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState(null);

  const getTypes = () => {
    return pokemonData.types.map(type => type.type)
  }

  useEffect(() => {
    (async _ => {
      const pokemonJson = await fetchFromURL(`${baseURL}/pokemon/${props.id}`)
      setPokemonData(pokemonJson)
      setIsLoading(false)
    })()
  }, [isLoading, props.id]);


  if (isLoading) {
    return <></>
  }

  return <div className="pokemon">
    <div className="title">{capitalizeFirst(props.id)}</div>
    <div >
      <div className="types">
        <b>Types :
        {getTypes().map(function (type) {
          return ` ${capitalizeFirst(type.name)}`
        })}</b>
      </div>
      <PokemonDamageRelations types={getTypes()}/>
    </div>
  </div>;
}
