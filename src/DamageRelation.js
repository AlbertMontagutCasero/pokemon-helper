import {capitalizeFirst} from './FormatFunctions';

export function DamageRelation(props) {
  const {description, damageRelation} = props

  return <div className={"damageRelation"}>
    <span>{description}</span>
    <div>
      {damageRelation.map(name => {
        return ` ${capitalizeFirst(name)}`
      })}
    </div>
  </div>
}
