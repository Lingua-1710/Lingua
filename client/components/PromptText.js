import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'

const PromptText = (props) => {
  return (
    <Entity>

      <a-text
        value={props.text}
        color={props.color}
        id={props.id}
        position={props.position}
        align={props.align}
      />

    </Entity>

  )
}

export default PromptText
