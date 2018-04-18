export default class Player{
  constructor(client, options){
    this.client = client;
    this.hp = 100;
    this.max = 100;
  }

  heal(amount){
    this.hp += amount
    this.max = Math.max(this.max, this.hp)
  }

  damage(amount){
    this.hp -= amount
  }

  serialize(){
    return { 
      hp: this.hp,
      max: this.max,
      id: this.id
    }
  }
}