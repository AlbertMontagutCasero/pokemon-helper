export function capitalizeFirst(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export function getNamesWithCounter(namesList){
  const banList = []
  const result = []

  for (let i = 0; i < namesList.length; i++){
    const currentName = namesList[i]
    if (banList.includes(currentName)){
      continue
    }

    let numberOfTimes = 0;
    for (let j = 0; j < namesList.length; j++){
      const nameToCompare = namesList[j]
      if (currentName === nameToCompare){
        numberOfTimes++
      }
    }
    banList.push(currentName)
    const numberOfTimesString = numberOfTimes === 1 ? "": ` ${numberOfTimes}`
    result.push(`${currentName}${numberOfTimesString}`)
  }

  return result
}
