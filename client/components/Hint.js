import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'

const Hint = (props) => {
  return (
    <Entity
      primitive='a-text'
      value={`(${props.hint})`}
      color='white'
      opacity="3"
      id="hint"
      position={props.position}
      align="center"
      rotation={props.rotation}
    />
  )
}

export default Hint
