export default class Storage{
  constructor(){
    this.lastId = 0
    this.database = {}
  }

  create(instance){
    return this.database[++this.lastId] = {
      id: this.lastId,
      instance
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