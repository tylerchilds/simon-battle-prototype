import UUID from './UUID';
import EventBus from './EventBus';
import Sequence from './Sequence';

export default class GameMaster extends EventBus{
  constructor(players, options){
    super()

    this.uuid = UUID.generate();
    this.games = players.map(p => {
        let g = this.newGame(this.uuid)
        g.player = p;
        return g;
    })
    
    options.initialize(this)
  }

  newGame(seed){
    return new Sequence({
      startSize: 3, 
      choices: ['red', 'blue', 'yellow', 'green'],
      seed
    })
  }

  action(game, data){
    game.action(data)
    this.trigger('game-updated', this)
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