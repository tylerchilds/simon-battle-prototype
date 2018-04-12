import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setChoices } from 'actions/game';
import { loadApp } from 'actions/app';
import styles from './simon.scss';
import GameClient from '../lib/GameClient';

export class Simon extends Component {
  constructor(props) {
    super(props)

    this.gameClient = new GameClient(this.initialized.bind(this)) 
  }

  initialized(data) {
    this.props.dispatch(setChoices(data.choices))
    this.props.dispatch(loadApp())
  }

  render() {
    if (!this.props.loaded) {
      return null;
    }
    
    return (
      <div className={styles.wrapper}>
        {
          this.props.choices.map((choice, i) => {
            return (
              <button key={i} onClick={() => this.guess(choice)} className={`${styles.button} ${styles[choice]}`}>
                {choice}
              </button>
            )
          })
        }
      </div>
    )
  }

  guess(choice) {
    this.gameClient.action({guess: choice})
  }
}

function mapStateToProperties(state) {
  return {
    loaded: state.app.loaded,
    choices: state.game.choices
  };
}

export default connect(mapStateToProperties)(Simon);
