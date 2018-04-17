import Player from './Player';
import Storage from './Storage';
import Sequence from './Sequence';
import MatchMaker from './MatchMaker';

const db = new Storage();
const matchMaker = new MatchMaker({size: 2});

export default class ConnectionManager{
  constructor(client){
    matchMaker.on('match-found', this.startGame.bind(this))
  }

  add(client){
    let player = db.create(new Player(client, {}))
    matchMaker.add(player)
  }

  startGame(players){
    console.log(players.map(p => p.id))
    players.map((p) => {

      p.game = db.create(new Sequence({startSize: 3, choices: ['red', 'blue', 'yellow', 'green']}))

      p.client.emit('initialize', p.game.serialize());
      p.client.on('disconnect', this.disconnect.bind(this, p));
      p.client.on('action', this.gameAction.bind(this, p));
    })
  }

  gameAction(player, data){
    player.game.action(data)
    console.log(player.game.state)
    player.client.emit('update', player.game.serialize());
  }

  disconnect(player){
    db.delete(player.game.id)
  }
}