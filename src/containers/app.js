import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadApp } from 'actions/app';
import styles from './app.css';
import { subscribeToTimer } from '../lib/api';

type Props = {
  dispatch: () => void,
  loaded: boolean
}

export class AppContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timestamp: 'no timestamp yet'
    }

    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
  }
  componentDidMount() {
    this.props.dispatch(loadApp());
  }

  props: Props;

  render() {
    if (!this.props.loaded) {
      return null;
    }

    return (
      <div className={styles.container}>
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
        </p>
      </div>
    );
  }
}

function mapStateToProperties(state) {
  return {
    loaded: state.app.loaded
  };
}

export default connect(mapStateToProperties)(AppContainer);
