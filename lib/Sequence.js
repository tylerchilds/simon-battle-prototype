export default class Sequence{
  constructor(options){
    this.choices = options.choices
    this.startSize = options.startSize
    
    this.newPattern()
  }

  newPattern(){
    this.pattern = []
    let count = this.startSize
    while(count > 0){
      this.addItem();
      count--;
    }
    this.startModerator()
    return this.pattern
  }

  newItem(){
    let item = this.addItem()
    this.startModerator()
    return [item]
  }

  addItem(){
    let item = this.choices[Math.floor(Math.random() * Math.floor(this.choices.length))]
    this.pattern.push(item)
    return item
  }

  action(data){
    return this.moderator.next(data.guess).value
  }

  startModerator(){
    this.moderator = this.patternModerator()
    this.action({})
  }

  *patternModerator(){
    for(let item of this.pattern){
      let input = yield {}
      if(input !== item) return {new: this.newPattern(), result: 'fail'}
    }

    return {new: this.newItem(), result: 'pass'}
  }

  serialize(){
    return {choices: this.choices}
  }
}