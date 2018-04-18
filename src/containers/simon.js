import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateGame } from 'actions/game';
import { updatePlayers } from 'actions/player';
import styles from './simon.scss';
import GameClient from '../lib/GameClient';
import Choices from './choices';

export class Simon extends Component {
  constructor(props) {
    super(props)

    this.gameClient = new GameClient()

    this.gameClient.on('client-game-update', (data) => props.updateGame(data))
    this.gameClient.on('client-player-update', (data) => props.updatePlayers(this.gameClient.playerId, data))

    this.gameClient.start()
  }

  render() {
    if (this.props.game.choices.length === 0) {
      return null;
    }
    
    return (
      <div>
        <Choices guess={this.guess.bind(this)} update={this.props.updateGame.bind(this)} />
      </div>
    )
  }

  guess(choice) {
    this.gameClient.action({guess: choice})
  }
}

function mapStateToProperties(state) {
  console.log(state)
  return {
    game: state.game,
    player: state.player
  };
}

const mapDispatchToProperties = {
  updateGame, updatePlayers
}

export default connect(mapStateToProperties, mapDispatchToProperties)(Simon);
