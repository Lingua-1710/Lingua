import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Cheese = () => {
  return (
    <Entity
      id="first-vendor"
    >
      <Entity>
        <a-asset-item
          id="cheese-obj"
          src="models/items/cheese/cheese.obj" />
        <a-asset-item
          id="Cheese-mtl"
          src="models/items/cheese/cheese.mtl" />
      </Entity>
      <a-obj-model
        id="cheese"
        src="#cheese-obj"
        mtl="#cheese-mtl"
        position="0 1.5 0"
        rotation="0 0 0"
      />
      <Entity
        primitive="a-light"
        type="directional"
        color="#FFF"
        intensity={1}
        position={{ x: 2.5, y: 0.0, z: 0.0 }}
      />
    </Entity>
  )
}

export default Cheese
