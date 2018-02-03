import React from 'react'
import { Entity } from 'aframe-react'

const Countdown = (props) => {
  return (
    <Entity
      primitive='a-text'
      value={props.time}
      color='green'
      height='15'
      width='15'
      position={props.position}
      align='center'
    />
  )
}

export default Countdown
