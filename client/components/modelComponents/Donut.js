import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Donut = (props) => {
  const animation = props.matchCharacter ?
  `property: position;
    dir: alternate;
    loop: true;
    to: 0 0.05 0;`
  : null
  return (
    <Entity>
      <Entity
        id='third-vendor'
        class='clickable'
        events={{
          click: props.handleVendorClick
        }}
        animation={animation}
      >
        <Entity
          primitive='a-obj-model'
          id='donut'
          src='models/donut/model.obj'
          mtl='models/donut/materials.mtl'
          position={props.vendorPosition}
          rotation={props.vendorRotation}
        />
      </Entity>
      <Entity
          primitive='a-light'
          type='directional'
          color='#FFF'
          intensity={1}
          position={{ x: 2.5, y: 0.0, z: 0.0 }}
      />
    </Entity>
  )
}

export default Donut
