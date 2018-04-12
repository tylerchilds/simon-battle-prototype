import openSocket from 'socket.io-client';

export default class GameClient{
  constructor(initialized){
    this.socket = openSocket('http://localhost:8000');
    this.socket.on('initialize', initialized);
  }

  action(data){
    this.socket.emit('action', data);
  }
}