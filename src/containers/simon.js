import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateGame } from 'actions/game';
import { updatePlayers } from 'actions/player';
import styles from '../styles/simon.scss';
import GameClient from '../lib/GameClient';
import Choices from './choices';
import HealthBar from '../components/health-bar';

export class Simon extends Component {
  constructor(props) {
    super(props)

    this.gameClient = new GameClient()

    this.gameClient.on('client-game-update', (data) => props.updateGame(data))
    this.gameClient.on('client-player-update', (data) => props.updatePlayers(this.gameClient.playerId, data))

    this.gameClient.start()
  }

  render() {
    let {current, enemies} = this.props.player;

    if (!current.hp) {
      return null;
    }

    return (
      <div className={styles.simon}>
        <div className={styles.current}>
          <HealthBar entity={current} name="You" />
        </div>
        <div className={styles.enemies}>
          {enemies.map((e, key) => (<HealthBar entity={e} name="Them" key={key} />))}
        </div>

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
