import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Cursor = () => {
  return (
    <Entity id="camera" primitive="a-camera" look-controls >
      <Entity primitive="a-cursor" />
    </Entity>
  )
}

export default Cursor
