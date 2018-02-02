import React from 'react'
import { Entity } from 'aframe-react'

const DisplayCorrect = (props) => {
  return (
    <Entity
      primitive='a-text'
      value={props.value}
      color='red'
      height='15'
      width='15'
      position={props.position}
      align='center'
    />
  )
}

export default DisplayCorrect
