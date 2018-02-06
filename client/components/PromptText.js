import React from 'react'
import { Entity } from 'aframe-react'

const PromptText = (props) => {
  return (

    <Entity
      primitive='a-text'
      value={props.promptProps.value}
      color={props.promptProps.color}
      id={props.promptProps.id}
      position={props.promptProps.position}
      width={props.promptProps.width}
      align={props.promptProps.align}
      />
  )
}

export default PromptText
