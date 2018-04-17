export default class Storage{
  constructor(){
    this.lastId = 0
    this.database = {}
  }

  create(instance){
    instance.id = ++this.lastId
    return this.database[this.lastId] = instance
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