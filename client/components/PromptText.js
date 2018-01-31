import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'

const PromptText = (props) => {
  console.log('prooops', props)
  return (

      <Entity
        primitive='a-text'
        value={props.promptProps.value}
        color={props.promptProps.color}
        id={props.promptProps.id}
        position={props.promptProps.position}
        align={props.promptProps.align}
      />


  )
}

export default PromptText
