import Sequence from './Sequence';

export default class GamesDatabase{
  constructor(){
    this.lastId = 0
    this.database = {}
  }

  create(){
    return this.database[++this.lastId] = {
      id: this.lastId,
      players: [],
      instance: new Sequence({startSize: 3, choices: ['red', 'blue', 'yellow', 'green']})
    }
  }

  read(id){
    return this.database[id]
  }

  update(id, data){
    this.database[id] = {
      ...this.database[id],
      ...data
    }
    return this.read(id)
  }
  
  delete(id){
    let record = this.read(id)
    delete this.database[id]
    return record;
  }
}