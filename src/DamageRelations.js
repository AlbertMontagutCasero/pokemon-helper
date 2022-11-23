export class DamageRelations {
  receiveX2
  dealsX2
  receiveX05
  dealsX05
  receiveX0
  dealsX0

  constructor() {
    this.receiveX2 = []
    this.dealsX2 = []
    this.receiveX05 = []
    this.dealsX05 = []
    this.receiveX0 = []
    this.dealsX0 = []
  }

  addTypeRawData(rawData){
    const damageRelations = rawData.damage_relations;
    const receiveX2 = damageRelations.double_damage_from;
    const dealsX2 = damageRelations.double_damage_to;
    const receiveX05 = damageRelations.half_damage_from;
    const dealsX05 = damageRelations.half_damage_to;
    const receiveX0 = damageRelations.no_damage_from;
    const dealsX0 = damageRelations.no_damage_to;
    
    this.receiveX2.push(...this.getNames(receiveX2))
    this.dealsX2.push(...this.getNames(dealsX2))
    this.receiveX05.push(...this.getNames(receiveX05))
    this.dealsX05.push(...this.getNames(dealsX05))
    this.receiveX0.push(...this.getNames(receiveX0))
    this.dealsX0.push(...this.getNames(dealsX0))
  }

  build() {
    this.receiveX2 = [...new Set(this.receiveX2)]
    this.dealsX2 = [...new Set(this.dealsX2)]
    this.receiveX05 = [...new Set(this.receiveX05)]
    this.dealsX05 = [...new Set(this.dealsX05)]
    this.receiveX0 = [...new Set(this.receiveX0)]
    this.dealsX0 = [...new Set(this.dealsX0)]
  }

  getNames(objectWithNamesList){
    return objectWithNamesList.map(object => {
      return object.name
    })
  }
}
