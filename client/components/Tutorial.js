import React from 'react'
import { Entity } from 'aframe-react'

const Tutorial = () => {
  return (
    <Entity
      id="tutorial-text-plane"
      primitive="a-plane"
      color="48505e"
      position="0 0 .01"
      radius="2"
      opacity="0"
    >
    <Entity
        id="tutorial-text"
        primitive="a-text"
        font="exo2bold"
        value="instructions for game will go here"
        color="000000"
        height="12"
        align="center"
        position="0 0 0"
      />
    </Entity>
)
}

export default Tutorial
