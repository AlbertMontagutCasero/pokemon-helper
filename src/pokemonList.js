import {useEffect, useState} from 'react';

const baseURL = `https://pokeapi.co/api/v2`

const fetchFromUrl = async (url) => {
  const rawData = await fetch(url)
  return await rawData.json()
}


function Pokemon(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState(null);

  const getTypes = () => {
    return pokemonData.types.map(type => type.type)
  }

  const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    (async _ => {
      const pokemonJson = await fetchFromUrl(`${baseURL}/pokemon/${props.id}`)
      setPokemonData(pokemonJson)
      setIsLoading(false)
    })()
  }, [isLoading]);


  if (isLoading){
    return <></>
  }

  return <div className="pokemon">
    {capitalizeFirst(props.id)}
    <div>
      Types :
        {getTypes().map(function(type) {
          return ` ${type.name}`
        })}
      <PokemonDamageRelations types={getTypes()} />
    </div>
  </div>;
}

function PokemonDamageRelations(props) {
  const {types} = props

  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const getReceiveDoubleDamageFrom = (type) => {
    const receiveDoubleDamageFrom = type.damage_relations.double_damage_from
    return receiveDoubleDamageFrom.map(damage => {
      return damage.name
    })
  }

  const getDealsDoubleDamageTo = (type) => {
    const dealsDoubleDamageTo = type.damage_relations.double_damage_to
    return dealsDoubleDamageTo.map(damage => {
      return damage.name
    })
  }

  const getHalfDamageFrom = (type) => {
    const receiveHalfDamageFrom = type.damage_relations.half_damage_from
    return  receiveHalfDamageFrom.map(damage => {
      return damage.name
    })
  }

  const getHalfDamageTo = (type) => {
    const dealsHalfDamageTo = type.damage_relations.half_damage_to
    return  dealsHalfDamageTo.map(damage => {
      return damage.name
    })
  }

  const getReceiveNoDamage = (type) => {
    const receiveNoDamage = type.damage_relations.no_damage_from
    return  receiveNoDamage.map(damage => {
      return damage.name
    })
  }

  const getDealsNoDamage = (type) => {
    const dealsNoDamage = type.damage_relations.no_damage_to
    return  dealsNoDamage.map(damage => {
      return damage.name
    })
  }

  useEffect(() => {
    (async () => {
      const data = {
        debilities: [],
        strong: [],
        getHalfDamage: [],
        dealsHalfDamage: [],
        getNoDamage: [],
        dealsNoDamage: []
      }

      for (let i = 0; i < types.length; i++) {
        const currentType = types[i]
        const typeJson = await fetchFromUrl(currentType.url)
        data.debilities.push(...getReceiveDoubleDamageFrom(typeJson))
        data.strong.push(...getDealsDoubleDamageTo(typeJson))
        data.getHalfDamage.push(...getHalfDamageFrom(typeJson))
        data.dealsHalfDamage.push(...getHalfDamageTo(typeJson))
        data.getNoDamage.push(...getReceiveNoDamage(typeJson))
        data.dealsNoDamage.push(...getDealsNoDamage(typeJson))
      }

      data.debilities =  [...new Set(data.debilities)];
      data.strong =  [...new Set(data.strong)];
      data.getHalfDamage =  [...new Set(data.getHalfDamage)];
      data.dealsHalfDamage =  [...new Set(data.dealsHalfDamage)];
      data.getNoDamage =  [...new Set(data.getNoDamage)];
      data.dealsNoDamage =  [...new Set(data.dealsNoDamage)];


      setData(data)
      setLoading(false)
    })()
  }, [isLoading])

  if (isLoading){
    return <div>Loading</div>
  }

  return (

          <div>
            <h4>Daños :</h4>

            <DamageRelation description={"☠ le hacen super efectivo"} damageRelation={data.debilities} />
            <DamageRelation description={"🗡 hace super efectivo"} damageRelation={data.strong} />
            <DamageRelation description={"🛡 le hacen mitad de daño"} damageRelation={data.getHalfDamage} />
            <DamageRelation description={"🗡 50% hace mitad de daño"} damageRelation={data.dealsHalfDamage} />
            <DamageRelation description={"👻 no le hacen daño"} damageRelation={data.getNoDamage} />
            <DamageRelation description={"🗡👻 no hace daño a"} damageRelation={data.dealsNoDamage} />

          </div>
  )
}

function DamageRelation(props) {
  const { description, damageRelation } = props

  return <div>
    {description}
    <div>
      {damageRelation.map(name => {
        return ` ${name}`
      })}
    </div>
  </div>
}




function PokemonList() {
  return <div>
    <Pokemon id="lairon" />
    <Pokemon id="cubone" />


  </div>
}


export default PokemonList;

