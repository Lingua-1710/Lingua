import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Coffee = () => {
  return (
    <Entity
      id='coffee'
    >
      <Entity>
        <a-asset-item
          id="coffee-obj"
          src="models/items/coffee/model.obj" />
        <a-asset-item
          id="coffee-mtl"
          src="models/items/coffee/materials.mtl" />
      </Entity>
      <a-obj-model
        id="coffee"
        src="#coffee-obj"
        mtl="#coffee-mtl"
        position="0 2 0"
        rotation="0 0 0"
      />
      <Entity
        primitive="a-text"
        value="You Got the Coffee!"
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

export default Coffee
