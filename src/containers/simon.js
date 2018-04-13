import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setChoices, updateGame } from 'actions/game';
import styles from './simon.scss';
import GameClient from '../lib/GameClient';

export class Simon extends Component {
  constructor(props) {
    super(props)

    this.gameClient = new GameClient()

    this.gameClient.on('initialize', this.initialize.bind(this))
    this.gameClient.on('update', this.update.bind(this))
    this.gameClient.on('success', this.success.bind(this))
    this.gameClient.on('failure', this.failure.bind(this))
    this.gameClient.on('ok', this.ok.bind(this))

    this.gameClient.start()

    this.$els = {}
  }

  initialize(data) {
    this.props.dispatch(updateGame(data))
  }

  update(data) {
    this.props.dispatch(updateGame(data))
  }

  success(data) {
    console.log('success', data)
  }

  failure(data) {
    console.log('failure', data)
  }

  ok(data) {
    console.log('ok', data)
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
    await this.sleep(200)
    for(let item of this.props.game.newItems){
      this.$els[item].classList.add(styles[`${item}--active`])
      await this.sleep(400)
      this.$els[item].classList.remove(styles[`${item}--active`])
      await this.sleep(200)
    }
    this.props.dispatch(updateGame({newItems: []}))
    this.$els.wrapper.classList.toggle(styles['wrapper--inactive'])
  }

  async sleep(time){
    await new Promise(resolve => setTimeout(() => resolve(), time));
  }
}

function mapStateToProperties(state) {
  return {
    game: state.game
  };
}

export default connect(mapStateToProperties)(Simon);
