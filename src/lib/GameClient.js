import openSocket from 'socket.io-client';
import EventBus from '../../lib/EventBus';

export default class GameClient extends EventBus{
  constructor(options){
    super()
    this.socket = openSocket(":8181");

    this.on('update', this.delegateEvents.bind(this))
  }

  start(){
    this.socket.on('initialize', (data) => this.trigger('initialize', data));
    this.socket.on('update', (data) => this.trigger('update', data));
  }

  action(data){
    this.socket.emit('action', data);
  }

  delegateEvents(data){
    // 'success', 'failure', 'ok'
    if(data.result) this.trigger(data.result, data)
  }
}