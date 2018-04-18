export default class Player{
  constructor(client, options){
    this.client = client;
    this.hp = 50;
    this.max = 50;
  }

  heal(amount){
    this.hp += amount
    this.max = Math.max(this.max, this.hp)
  }

  damage(amount){
    this.hp -= amount
    this.hp = Math.max(this.hp, 0)
  }

  serialize(){
    return { 
      hp: this.hp,
      max: this.max,
      id: this.id
    }
  }
}