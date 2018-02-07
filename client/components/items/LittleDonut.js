import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const LittleDonut = () => {
  return (
    <Entity
      id="little-donut"
    >
      <Entity>
        <a-asset-item
          id="little-donut-obj"
          src="models/items/littledonut/model.obj" />
        <a-asset-item
          id="little-donut-mtl"
          src="models/items/littledonut/materials.mtl" />
      </Entity>
      <a-obj-model
        id="little-donut"
        src="#little-donut-obj"
        mtl="#little-donut-mtl"
        position="0 1.5 0"
        rotation="0 0 0"
      />
      <Entity
        primitive="a-text"
        value="You Got the Little Donut!"
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

export default LittleDonut
