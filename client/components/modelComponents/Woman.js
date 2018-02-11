import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Woman = (props) => {
  return (
    <Entity
      id="second-vendor"
      class="clickable"
      events={{
        click: props.handleVendorClick
      }}
    >
      <Entity>
        <a-asset-item
          id="woman-obj"
          src="models/woman/model.obj" />
        <a-asset-item
          id="woman-mtl"
          src="models/woman/materials.mtl" />
      </Entity>
      <a-obj-model
        id="woman"
        src="#woman-obj"
        mtl="#woman-mtl"
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
      <a-animation
        easing="linear"
        direction="alternate"
        attribute="position"
        from="0 0 0"
        to="0 0.02 0"
        repeat="indefinite"
        delay="0000"
        dur="300"
      >
      </a-animation>
    </Entity>
  )
}

export default Woman
