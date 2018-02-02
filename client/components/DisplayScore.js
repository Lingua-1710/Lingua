import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const DisplayScore = (props) => {
  console.log("IS THIS WORKING?????????")
  return (
    <Entity
      primitive='a-text'
      value={props.score}
      color='red'
      height='15'
      width='15'
      position={props.position}
      align='center'
    />
  )
}

export default DisplayScore
