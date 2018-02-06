import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Octo = (props) => {
  return (
    <Entity
      id="first-vendor"
      class="clickable"
      events={{
        click: props.handleVendorClick
      }}
    >
      <Entity>
        <a-asset-item
          id="octo-obj"
          src="models/octo/ramenocto.obj" />
        <a-asset-item
          id="octo-mtl"
          src="models/octo/ramenoctomaterials.mtl" />
      </Entity>
      <a-obj-model
        id="octo"
        src="#octo-obj"
        mtl="#octo-mtl"
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

export default Octo
