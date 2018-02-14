import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'

const Hint = (props) => {
  return (
    <Entity
      id="hint-text"
      primitive="a-plane"
      opacity="0.8"
      position={props.position}
      rotation={props.rotation}
      color="blue"
      width="5"
      height="0.8"
    >
      <Entity
        primitive='a-text'
        value={`(${props.hint})`}
        color={props.color}
        opacity="3"
        id="hint"
        align="center"
      />
    </Entity>
  )
}

export default Hint
