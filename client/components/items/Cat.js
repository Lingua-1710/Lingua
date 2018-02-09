import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Cat = () => {
  return (
    <Entity
      id="first-vendor"
    >
      <Entity>
        <a-asset-item
          id="cat-obj"
          src="models/items/cat/model.obj" />
        <a-asset-item
          id="Cat-mtl"
          src="models/items/cat/materials.mtl" />
      </Entity>
      <a-obj-model
        id="cat"
        src="#cat-obj"
        mtl="#cat-mtl"
        position="0 1.3 2"
        rotation="0 0 0"
      />
      <Entity
        primitive="a-text"
        value="You Got the Cat!"
        opacity="2"
        position="0 1.3 2"
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

export default Cat
