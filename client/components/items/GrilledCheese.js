import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const GrilledCheese = () => {
  return (
    <Entity
      id='cheese'
    >
      <Entity>
        <a-asset-item
          id="cheese-obj"
          src="models/items/grilledcheese/model.obj" />
        <a-asset-item
          id="cheese-mtl"
          src="models/items/grilledcheese/materials.mtl" />
      </Entity>
      <a-obj-model
        id="cheese"
        src="#cheese-obj"
        mtl="#cheese-mtl"
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

export default GrilledCheese
