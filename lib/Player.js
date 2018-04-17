export default class Player{
  constructor(client, options){
    this.client = client;
    this.hp = 20;
  }

  serialize(){
    return { 
      hp: this.hp
    }
  }
}