import React from 'react'
import { Entity } from 'aframe-react'
import 'aframe-animation-component'

const Octo = (props) => {
  const animation = props.matchCharacter ?
  `property: position;
    dir: alternate;
    loop: true;
    to: 0 0.1 0;`
  : null
  return (
    <Entity>
      <Entity
        id='first-vendor'
        class='clickable'
        events={{
          click: props.handleVendorClick
        }}
        animation={animation}
      >
        <Entity
          primitive='a-obj-model'
          id='octo'
          src='models/octo/ramenocto.obj'
          mtl='models/octo/ramenoctomaterials.mtl'
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

export default Octo
