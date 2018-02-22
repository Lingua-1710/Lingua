import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Donut = (props) => {
  const animation = props.matchCharacter ?
  `property: position;
    dir: alternate;
    loop: true;
    to: 0 0.05 0;` : null
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
          events={{'model-loaded': () => props.setLoading({donut: true})}}
        />
      </Entity>
      <Entity
        primitive='a-light'
        type='point'
        color='#FFF'
        intensity={.5}
        angle='0'
        position={props.vendorPosition}
      />
    </Entity>
  )
}

export default Donut
