export default class EventBus{
  constructor(){
    this.events = {}
  }
  
  on(e, handler){
    if(!this.events[e]) this.events[e] = [];

    this.events[e].push(handler)

    return this
  }

  trigger(e){
    if(!this.events[e]) return;

    let args = Array.prototype.slice.call(arguments, 1);

    this.events[e].forEach(h => h.apply(null, args))

    return this
  }
}