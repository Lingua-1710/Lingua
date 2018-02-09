import React from 'react'
import { Entity } from 'aframe-react'

const DisplayCorrect = (props) => {
  return (
    <Entity
      primitive='a-text'
      value={props.value}
      color='red'
      position={props.position}
      align='center'
      rotation={props.rotation}
    />
  )
}

export default DisplayCorrect
