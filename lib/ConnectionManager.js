import Player from './Player';
import Storage from './Storage';
import Sequence from './Sequence';

const db = new Storage()

export default class ConnectionManager{
  constructor(client){
    this.client = client;

    this.player = new Player()
    this.game = db.create(new Sequence({startSize: 3, choices: ['red', 'blue', 'yellow', 'green']}))

    this.client.emit('initialize', this.game.instance.serialize());

    this.client.on('disconnect', this.disconnect.bind(this));
    this.client.on('action', this.perform.bind(this));
  }

  perform(data){
    this.game.instance.action(data)
    console.log(this.game.instance.state)
    this.client.emit('update', this.game.instance.serialize());
  }

  disconnect(){
    db.delete(this.game.id)
  }
}