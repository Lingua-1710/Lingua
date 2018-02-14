import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Woman = (props) => {
  const animation = props.matchCharacter ?
  `property: position;
    dir: alternate;
    loop: true;
    to: 0 0.05 0;`
  : null
  return (
    <Entity>
      <Entity
        id='second-vendor'
        class='clickable'
        events={{
          click: props.handleVendorClick
        }}
        animation={animation}
      >
        <Entity
          primitive='a-obj-model'
          id='woman'
          src='models/woman/model.obj'
          mtl='models/woman/materials.mtl'
          position={props.vendorPosition}
          rotation={props.vendorRotation}
          events={{'model-loaded': () => props.setLoading({woman: true})}}
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

export default Woman
