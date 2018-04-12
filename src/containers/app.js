import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './app.css';
import Simon from './simon';

type Props = {
  dispatch: () => void,
  loaded: boolean
}

export class AppContainer extends Component {
  props: Props;

  render() {
    return (
      <div className={styles.container}>
        <Simon />
      </div>
    );
  }
}

export default AppContainer;
