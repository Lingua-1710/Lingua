import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Macaron = () => {
  return (
    <Entity
      id='Macaron'
    >
      <Entity>
        <a-asset-item
          id="macaron-obj"
          src="models/items/macaron/model.obj" />
        <a-asset-item
          id="macaron-mtl"
          src="models/items/macaron/materials.mtl" />
      </Entity>
      <a-obj-model
        id="macaron"
        src="#macaron-obj"
        mtl="#macaron-mtl"
        position="0 2 0"
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

export default Macaron
