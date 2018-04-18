import React, { Component } from 'react';
import styles from '../styles/health-bar.scss';

const HealthBar = ({entity, name}) => {
  let fill = Math.floor((entity.hp/entity.max) * 100)

  let color = (() => fill > 70 ? 'green' : fill > 30 ? 'yellow' : 'red')()
  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={`${styles.bar__fill} ${styles[color]}`} style={{ minHeight: `${fill}%`}} />
      </div>
      {name}
    </div>
  )
}

export default HealthBar