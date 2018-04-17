import seedrandom from 'seedrandom'

export default class Sequence{
  constructor(options){
    this.choices = options.choices
    this.startSize = options.startSize
    this.player = options.player
    this.master = options.master
    this.random = seedrandom(options.seed)
    
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
    let item = this.choices[Math.floor(this.random() * Math.floor(this.choices.length))]
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
      let input = yield {}
      if(input !== item){
        this.master.incorrect(this.player, {count})
        return { newItems: this.newPattern() }
      }
      count++
      total += count
      this.master.correct(this.player, {count})
    }

    this.master.complete(this.player, {count, total})

    return { newItems: this.newItem() }
  }

  serialize(){
    return { choices: this.choices, ...this.state }
  }
}