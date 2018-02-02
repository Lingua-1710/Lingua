import React from 'react'
import { Entity } from 'aframe-react'


const DisplayScore = (props) => {
  return (
    <Entity
      primitive='a-text'
      value={props.score}
      color='red'
      height='15'
      width='15'
      position={props.position}
      align='center'
    />
  )
}

export default DisplayScore
