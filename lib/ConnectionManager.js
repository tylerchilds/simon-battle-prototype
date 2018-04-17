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

  newGame(seed){
    return db.create(new Sequence({
      startSize: 3, 
      choices: ['red', 'blue', 'yellow', 'green'],
      seed
    }))
  }

  startGame(players){
    let seed = Math.random();

    players.map((p) => {
      let game = this.newGame(seed)

      p.client.emit('initialize', game.serialize());
      p.client.on('disconnect', this.disconnect.bind(this, p, game));
      p.client.on('action', this.gameAction.bind(this, p, game));
    })
  }

  gameAction(player, game, data){
    game.action(data)
    console.log(game.state)
    player.client.emit('update', game.serialize());
  }

  disconnect(player, game){
    db.delete(player.id)
    db.delete(game.id)
  }
}