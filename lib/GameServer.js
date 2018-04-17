import Player from './Player';
import Storage from './Storage';
import MatchMaker from './MatchMaker';
import GameMaster from './GameMaster';

const db = new Storage();
const matchMaker = new MatchMaker({size: 2});

export default class GameServer{
  constructor(client){
    matchMaker.on('match-found', this.startGame.bind(this))
  }

  add(client){
    const player = db.create(new Player(client, {}))
    matchMaker.add(player)
  }

  startGame(players){
    new GameMaster(players, {
      initialize: this.establishGameEvents.bind(this)
    })
  }

  establishGameEvents(gameMaster){
    gameMaster.on('game-updated', (gm) => this.broadcast(gm))

    gameMaster.games.map((game) => {
      let p = game.player;

      p.client.join(gameMaster.uuid)

      p.client.emit('server-start', p.id, gameMaster.serialize());
      p.client.on('disconnect', this.disconnect.bind(this, gameMaster, p));
      p.client.on('action', gameMaster.action.bind(gameMaster, game));
    })
  }

  broadcast(gameMaster){
    io.sockets.in(gameMaster.uuid).emit('server-update', gameMaster.serialize())
  }

  disconnect(gameMaster, player){
    player.client.disconnect()
    db.delete(player.id)
  }
}