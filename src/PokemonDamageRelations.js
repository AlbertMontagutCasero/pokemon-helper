import {useEffect, useState} from "react";
import {DamageRelations} from './Model/DamageRelations';
import {DamageRelation} from './DamageRelation';
import {fetchFromURL} from './FetchFromURL';
import {getNamesWithCounter} from './FormatFunctions';

export function PokemonDamageRelations(props) {
  const {types} = props

  const [isLoading, setLoading] = useState(true)
  const [damageRelations, setDamageRelations] = useState(null)

  useEffect(() => {
    (async () => {
      const damageRelations = new DamageRelations();

      for (let i = 0; i < types.length; i++) {
        const currentType = types[i]
        const typeJson = await fetchFromURL(currentType.url)
        damageRelations.addTypeRawData(typeJson)
      }

      damageRelations.build()
      setDamageRelations(damageRelations)
      setLoading(false)
    })()
  }, [isLoading, types])

  if (isLoading) {
    return <div>Loading</div>
  }

  return (

    <div className="damageRelationsWrapper">
      <h4>Daños :</h4>

      <div className='good'>
        <DamageRelation description={"🗡 Hace super efectivo ✅"} damageRelation={getNamesWithCounter(damageRelations.dealsX2)}/>
        <DamageRelation description={"🛡 Le hacen mitad de daño ✅"} damageRelation={getNamesWithCounter(damageRelations.receiveX05)}/>
        <DamageRelation description={"👻 No le hacen daño ✅"} damageRelation={damageRelations.receiveX0}/>
      </div>
      <div className='bad'>
        <DamageRelation description={"☠ Le hacen super efectivo ❌"} damageRelation={getNamesWithCounter(damageRelations.receiveX2)}/>
        <DamageRelation description={"🗡 50% Hace mitad de daño ❌"} damageRelation={getNamesWithCounter(damageRelations.dealsX05)}/>
        <DamageRelation description={"🗡👻 No hace daño a ❌"} damageRelation={damageRelations.dealsX0}/>
      </div>
    </div>
  )
}
