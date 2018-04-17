import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setChoices, updateGame } from 'actions/game';
import styles from './simon.scss';
import GameClient from '../lib/GameClient';
import Choices from './choices';

export class Simon extends Component {
  constructor(props) {
    super(props)

    this.gameClient = new GameClient()

    this.gameClient.on('initialize', (id, data) => console.log(id, data))
    this.gameClient.on('update', (data) => props.updateGame(data))
    this.gameClient.on('success', (data) => props.updateGame(data))
    this.gameClient.on('failure', (data) => props.updateGame(data))
    this.gameClient.on('ok', (data) => props.updateGame(data))

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
  return {
    game: state.game
  };
}

const mapDispatchToProperties = {
  updateGame
}

export default connect(mapStateToProperties, mapDispatchToProperties)(Simon);
