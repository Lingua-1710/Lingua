import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Fish = () => {
  return (
    <Entity
      id="first-vendor"
    >
      <Entity>
        <a-asset-item
          id="fish-obj"
          src="models/items/fish/model.obj" />
        <a-asset-item
          id="Fish-mtl"
          src="models/items/fish/materials.mtl" />
      </Entity>
      <a-obj-model
        id="fish"
        src="#fish-obj"
        mtl="#fish-mtl"
        position="0 1.5 0"
        rotation="0 0 0"
      />
      <Entity
        primitive="a-text"
        value="You Got the Fish!"
        opacity="2"
        position="5 1.3 -4"
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

export default Fish
