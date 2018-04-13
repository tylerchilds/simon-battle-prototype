import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setChoices, updateGame } from 'actions/game';
import styles from './simon.scss';
import GameClient from '../lib/GameClient';

export class Simon extends Component {
  constructor(props) {
    super(props)

    this.gameClient = new GameClient({
      initialized: this.initialized.bind(this),
      updated: this.updated.bind(this)
    })

    this.$els = {}
  }

  initialized(data) {
    this.props.dispatch(updateGame(data))
  }

  updated(data){
    this.props.dispatch(updateGame(data))
  }

  componentDidUpdate(){
    const { newItems } = this.props.game;
    if(this.loaded && newItems.length > 0) this.animateNew()
  }

  render() {
    if (this.props.game.choices.length === 0) {
      return null;
    }

    this.loaded = true
    
    return (
      <div className={styles.wrapper} ref={(el) => this.$els.wrapper = el}>
        {
          this.props.game.choices.map((choice, key) => {
            const props = {
              href: "javascript:;",
              ref: (el) => this.$els[choice] = el,
              onTouchStart: () => {
                this.$els[choice].classList.add(styles[`${choice}--active`])
              },
              onTouchEnd: () => {
                this.$els[choice].classList.remove(styles[`${choice}--active`])
                this.guess(choice)
              },
              className: `${styles.button} ${styles[choice]}`,
              key
            }
            return (
              <a {...props}>
                {choice}
              </a>
            )
          })
        }
      </div>
    )
  }

  guess(choice) {
    this.gameClient.action({guess: choice})
  }

  async animateNew() {
    this.$els.wrapper.classList.toggle(styles['wrapper--inactive'])
    await this.delay(750)
    for(let item of this.props.game.newItems){
      await this.animate(item)
    }
    this.props.dispatch(updateGame({newItems: []}))
    this.$els.wrapper.classList.toggle(styles['wrapper--inactive'])
  }

  animate(item) {
    this.$els[item].classList.toggle(styles[`${item}--active`])
    return new Promise(resolve => {
      setTimeout(() => {
        this.$els[item].classList.toggle(styles[`${item}--active`])
        setTimeout(() => resolve(), 200)
      }, 400);
    });
  }

  async delay(time){
    await new Promise(resolve => setTimeout(() => resolve(), time));
  }
}

function mapStateToProperties(state) {
  return {
    game: state.game
  };
}

export default connect(mapStateToProperties)(Simon);
