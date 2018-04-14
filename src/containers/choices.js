import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../styles/choices.scss';

const Input = ({choice, group, trigger}) => {
  const props = {
    href: "javascript:;",
    ref: (el) => group[choice] = el,
    onTouchStart: () => {
      group[choice].classList.add(styles[`${choice}--active`])
    },
    onTouchEnd: () => {
      group[choice].classList.remove(styles[`${choice}--active`])
      trigger(choice)
    },
    className: `${styles.button} ${styles[choice]}`
  }

  return (
    <a {...props}>
      {choice}
    </a>
  )
}

class Choices extends Component {
  constructor(props, {dispatch}){
    super(props)

    this.$els = {}
  }

  componentDidMount(){
    this.animateNew()
  }

  componentDidUpdate(){
    const { newItems } = this.props.game;
    if(newItems.length > 0) this.animateNew()
  }
  
  render(){
    return (
      <div className={styles.wrapper} ref={(el) => this.$els.wrapper = el}>
        {
          this.props.game.choices.map((choice, key) => {
            let props = {choice, key, group: this.$els, trigger: this.props.guess}
            return <Input {...props} />
          })
        }
      </div>
    )
  }

  async animateNew() {
    if(this.drawing) return true;
    this.drawing = true;
    this.$els.wrapper.classList.toggle(styles['wrapper--inactive'])
    await this.sleep(200)
    for(let item of this.props.game.newItems){
      this.$els[item].classList.add(styles[`${item}--active`])
      await this.sleep(400)
      this.$els[item].classList.remove(styles[`${item}--active`])
      await this.sleep(200)
    }
    this.props.update({newItems: []})
    this.$els.wrapper.classList.toggle(styles['wrapper--inactive'])
    this.drawing = false;
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

export default connect(mapStateToProperties)(Choices);