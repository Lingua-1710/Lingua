import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import { Cursor } from './index'

const Player = () => {
  return (
    <Entity primitive="a-camera" wasd-controls-enabled="true" >
      <Cursor />
    </Entity>
  )
}

export default Player
