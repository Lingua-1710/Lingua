import React from 'react'
import { Entity } from 'aframe-react'

const PromptText = (props) => {
  return (
    <Entity
      primitive='a-text'
      value='Listening!'
      color='blue'
      shader='msdf'
      font='https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/firasanscondensed/FiraSansCondensed-Regular.json'
      id='listening'
      position={props.position}
      rotation={props.rotation}
    />
  )
}

export default PromptText
