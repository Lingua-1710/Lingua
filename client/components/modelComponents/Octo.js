import React from 'react'
import { Entity } from 'aframe-react'
import 'aframe-animation-component'

const Octo = (props) => {
  return (
    <Entity>
      <Entity
        id='first-vendor'
        class='clickable'
        events={{
          click: props.handleVendorClick
        }}
        animation={`
          property: position;
          dir: alternate;
          loop: true;
          to: 0 0.1 0;
          startEvents: click;
          pauseEvents: animationPause2;
        `}
      >
        <Entity
          event-proxy="emit: animationPause1"
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
