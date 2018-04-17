import UUID from './UUID';

export default class Storage{
  constructor(){
    this.database = {}
  }

  create(instance){
    instance.id = UUID.generate()
    return this.database[instance.id] = instance
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