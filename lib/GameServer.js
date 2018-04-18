import Player from './Player';
import Storage from './Storage';
import MatchMaker from './MatchMaker';
import GameMaster from './GameMaster';

const db = new Storage();
const matchMaker = new MatchMaker({size: 2});

export default class GameServer{
  constructor(io){
    this.io = io
    matchMaker.on('match-found', this.startGame.bind(this))
  }

  add(client){
    const player = db.create(new Player(client, {}))
    matchMaker.add(player)
  }

  startGame(players){
    new GameMaster(players, {
      initialize: this.initialize.bind(this)
    })
  }

  initialize(gameMaster){
    gameMaster.on('player-update', gm => this.playerUpdate(gm))
    gameMaster.on('game-update', game => this.gameUpdate(game))

    gameMaster.games.map((game) => {
      let p = game.player;

      p.client.join(gameMaster.uuid)
      p.client.emit('server-start', p.id);
      p.client.on('disconnect', this.disconnect.bind(this, gameMaster, p));
      p.client.on('action', gameMaster.action.bind(gameMaster, game));

      this.gameUpdate(game)
    })

    this.playerUpdate(gameMaster)
  }

  playerUpdate(gameMaster){
    this.io.sockets.in(gameMaster.uuid).emit('server-player-update', gameMaster.serialize().players)
  }

  gameUpdate(game){
    game.player.client.emit('server-game-update', game.serialize())
  }

  disconnect(gameMaster, player){
    player.client.disconnect()
    db.delete(player.id)
  }
}