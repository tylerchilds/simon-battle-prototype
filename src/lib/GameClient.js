import openSocket from 'socket.io-client';

export default class GameClient{
  constructor(options){
    this.socket = openSocket();
    this.socket.on('initialize', options.initialized);
    this.socket.on('update', options.updated);
  }

  action(data){
    this.socket.emit('action', data);
  }
}