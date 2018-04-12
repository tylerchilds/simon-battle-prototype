import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadApp } from 'actions/app';
import GameClient from '../lib/GameClient';

export class Simon extends Component {
  constructor(props) {
    super(props)

    this.gameClient = new GameClient(this.initialized.bind(this)) 
    this.state = {
      choices: []
    }
  }

  initialized(data) {
    this.setState({choices: data.choices})
    this.props.dispatch(loadApp());
  }

  render() {
    if (!this.props.loaded) {
      return null;
    }
    
    return (
      <div>
        {
          this.state.choices.map((choice, i) => {
            return <button key={i} onClick={() => this.guess(choice)}>{choice}</button>
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
    loaded: state.app.loaded
  };
}

export default connect(mapStateToProperties)(Simon);
