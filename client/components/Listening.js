import React from 'react'
import { Entity } from 'aframe-react'

const PromptText = (props) => {
  return (
    <Entity
      primitive='a-text'
      value='Listening!'
      color={props.color}
      shader='msdf'
      font='https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/firasanscondensed/FiraSansCondensed-Regular.json'
      id='listening'
      position={props.position}
    />
  )
}

export default PromptText
