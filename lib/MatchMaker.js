import EventBus from './EventBus';

export default class MatchMaker extends EventBus{
  constructor(options){
    super()
    this.queue = [];
    this.size = options.size;
  }

  add(instance){
    this.queue.push(instance)
    this.makeMatches()
  }

  makeMatches(){
    if(this.queue.length >= this.size){
      let players = this.queue.splice(0, this.size);
      this.trigger('match-found', players)
      this.makeMatches()
    }
  }
}