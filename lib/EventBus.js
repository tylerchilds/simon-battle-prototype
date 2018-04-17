export default class EventBus{
  constructor(){
    this.events = {}
  }
  
  on(e, handler){
    if(!this.events[e]) this.events[e] = [];

    this.events[e].push(handler)
  }

  trigger(e, data){
  	if(!this.events[e]) return;

    this.events[e].forEach(h => h(data))
  }
}