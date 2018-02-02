import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const DisplayCorrect = (props) => {
  return (
    <Entity
      primitive='a-text'
      value={props.value}
      color='red'
      height='15'
      width='15'
      position={props.position}
      align='center'
    />
  )
}

export default DisplayCorrect
