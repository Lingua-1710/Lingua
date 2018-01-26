import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const Cursor = () => {
  return (
    <Entity primitive="a-camera" look-controls>
      <Entity
        primitive="a-cursor"
        cursor={{ fuse: false }}
        material={{ color: 'white', shader: 'flat', opacity: 0.75 }}
        geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
        event-set__1={{
          event: 'mouseenter',
          scale: { x: 1.4, y: 1.4, z: 1.4 }
        }}
        event-set__2={{
          event: 'mouseleave',
          scale: { x: 1, y: 1, z: 1 }
        }}
        raycaster="objects: .clickable"
      />
    </Entity>
  )
}

export default Cursor