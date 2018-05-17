import openSocket from 'socket.io-client';
import EventBus from '../../lib/EventBus';

export default class GameClient extends EventBus{
  constructor(options){
    super()
    this.socket = openSocket(":8181");

    this.on('update', this.delegateEvents.bind(this))
  }

  start(){
    this.socket.on('server-start', (id) => {
      this.playerId = id
    });
    this.socket.on('server-game-update', (data) => this.trigger('client-game-update', data));
    this.socket.on('server-player-update', (data) => this.trigger('client-player-update', data));
  }

  action(data){
    this.socket.emit('action', data);
  }

  delegateEvents(data){
    // 'success', 'failure', 'ok'
    if(data.result) this.trigger(data.result, data)
  }
}