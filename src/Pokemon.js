import {useEffect, useState} from "react";
import {fetchFromURL} from "./FetchFromURL";
import {capitalizeFirst} from "./ReactHelpers";
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
  }, [isLoading]);


  if (isLoading) {
    return <></>
  }

  return <div className="pokemon">
    {capitalizeFirst(props.id)}
    <div>
      Types :
      {getTypes().map(function (type) {
        return ` ${type.name}`
      })}
      <PokemonDamageRelations types={getTypes()}/>
    </div>
  </div>;
}
