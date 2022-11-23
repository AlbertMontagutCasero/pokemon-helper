export function DamageRelation(props) {
  const {description, damageRelation} = props

  return <div>
    {description}
    <div>
      {damageRelation.map(name => {
        return ` ${name}`
      })}
    </div>
  </div>
}
