import {useEffect, useState} from "react";
import {DamageRelations} from "./DamageRelations";
import {DamageRelation} from './DamageRelation';
import {fetchFromURL} from './FetchFromURL';

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
  }, [isLoading])

  if (isLoading) {
    return <div>Loading</div>
  }

  return (

    <div>
      <h4>Daños :</h4>

      <DamageRelation description={"☠ le hacen super efectivo"} damageRelation={damageRelations.receiveX2}/>
      <DamageRelation description={"🗡 hace super efectivo"} damageRelation={damageRelations.dealsX2}/>
      <DamageRelation description={"🛡 le hacen mitad de daño"} damageRelation={damageRelations.receiveX05}/>
      <DamageRelation description={"🗡 50% hace mitad de daño"} damageRelation={damageRelations.dealsX05}/>
      <DamageRelation description={"👻 no le hacen daño"} damageRelation={damageRelations.receiveX0}/>
      <DamageRelation description={"🗡👻 no hace daño a"} damageRelation={damageRelations.dealsX0}/>

    </div>
  )
}
