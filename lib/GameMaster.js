import UUID from './UUID';
import EventBus from './EventBus';
import Sequence from './Sequence';

export default class GameMaster extends EventBus{
  constructor(players, options){
    super()

    this.uuid = UUID.generate();
    this.games = players.map(p => {
      return this.newGame(this.uuid, p)
    })
    
    options.initialize(this)

    this.fire = {
      playerUpdate: () => this.trigger('player-update', this),
      gameUpdate: game => this.trigger('game-update', game)
    }
  }

  newGame(seed, player){
    return new Sequence({
      startSize: 3, 
      choices: ['red', 'blue', 'yellow', 'green'],
      master: this,
      player,
      seed
    })
  }

  incorrect(player, data){
    this.fire.playerUpdate()
  }

  correct(player, data){
    let otherPlayers = this.games.filter(g => g.player.id !== player.id).map(g => g.player)
    otherPlayers.forEach(p => p.damage(data.count))
    this.fire.playerUpdate()    
  }

  complete(player, data){
    player.heal(data.total + data.count + 1)
    this.fire.playerUpdate()    
  }

  action(game, data){
    game.action(data)
    this.fire.gameUpdate(game)
  }

  serialize(){
    let players = {}
    let games = {}

    for(let g of this.games){
      players[g.player.id] = g.player.serialize()
      games[g.player.id] = g.serialize()
    }
    
    return {
      players, games
    }
  }
}