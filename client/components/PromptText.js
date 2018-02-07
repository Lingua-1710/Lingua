import React from 'react'
import { Entity } from 'aframe-react'

const PromptText = (props) => {
  return (

    <Entity
      primitive='a-text'
      value={props.value}
      color={props.color}
      id={props.id}
      position={props.position}
      width={props.width}
      align={props.align}
      />
  )
}

export default PromptText
