import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Donut = (props) => {
  return (
    <Entity
      id="third-vendor"
      class="clickable"
      events={{
        click: props.handleVendorClick
      }}
    >
      <Entity>
        <a-asset-item
          id="donut-obj"
          src="models/donut/model.obj" />
        <a-asset-item
          id="donut-mtl"
          src="models/donut/materials.mtl" />
      </Entity>
      <a-obj-model
        id="donut"
        src="#donut-obj"
        mtl="#donut-mtl"
        position={
          Object.keys(props.vendorPosition)
            .map(key => props.vendorPosition[key])
            .join(' ')
        }
        rotation={
          Object.keys(props.vendorRotation)
            .map(key => props.vendorRotation[key])
            .join(' ')
        }
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

export default Donut
