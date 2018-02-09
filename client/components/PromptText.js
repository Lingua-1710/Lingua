import React from 'react'
import { Entity } from 'aframe-react'
import { deAccent } from '../utils/accentRemover'

const PromptText = (props) => {
  return (
    <Entity
      primitive='a-text'
      value={deAccent(props.value)}
      color={props.color}
      shader='msdf'
      font='https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/firasanscondensed/FiraSansCondensed-Regular.json'
      id={props.id}
      position={props.position}
      width={props.width}
      align={props.align}
    />
  )
}

export default PromptText
