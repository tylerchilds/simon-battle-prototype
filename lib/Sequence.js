export default class Sequence{
  constructor(options){
    this.choices = options.choices
    this.startSize = options.startSize
    
    this.newPattern()

    this.state = {newItems: this.pattern}
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
    this.state = this.moderator.next(data.guess).value;
  }

  startModerator(){
    this.moderator = this.patternModerator()
    this.action({})
  }

  *patternModerator(){
    let count = 0;
    let total = 0;
    for(let item of this.pattern){
      let input = yield { result: 'ok', count }
      if(input !== item) return { newItems: this.newPattern(), result: 'failure', count }
      count++
      total += count
    }

    total += count + 1

    return { newItems: this.newItem(), result: 'success', count, total }
  }

  serialize(){
    return { choices: this.choices, ...this.state }
  }
}