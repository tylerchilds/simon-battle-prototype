import openSocket from 'socket.io-client';

export default class GameClient{
  constructor(options){
    this.socket = openSocket();
    this.events = {}

    this.on('update', this.delegateEvents.bind(this))
  }

  start(){
    this.socket.on('initialize', (data) => this.trigger('initialize', data));
    this.socket.on('update', (data) => this.trigger('update', data));
  }

  on(e, handler){
    if(!this.events[e]) this.events[e] = [];

    this.events[e].push(handler)
  }

  trigger(e, data){
  	if(!this.events[e]) return;

    this.events[e].forEach(h => h(data))
  }

  action(data){
    this.socket.emit('action', data);
  }

  delegateEvents(data){
    // 'success', 'failure', 'ok'
    if(data.result) this.trigger(data.result, data)
  }
}