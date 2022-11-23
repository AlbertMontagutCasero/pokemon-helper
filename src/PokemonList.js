import {Pokemon} from './Pokemon';

function PokemonList() {
  const team = ['lairon', 'piloswine', 'sunflora', 'gible', 'illumise', 'togepi']

  return <div>
    {team.map(teamMember => {
      return <Pokemon id={teamMember}/>
    })}
  </div>
}


export default PokemonList;

