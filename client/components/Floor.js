import React from 'react'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Floor= () => {
  return (
    <Entity
      id="floor"
      static-body
      primitive="a-box"
      depth="50"
      height="0.1"
      width="50"
      color="#2E3837"
      shader="flat"
      physics-body="mass: 0; boundingBox: 50 0.1 50"
      position="0 0 -10"
    />
  )
}

export default Floor
