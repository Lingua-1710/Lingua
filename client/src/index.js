import React from 'react'
import ReactDOM from 'react-dom'
import 'aframe'
import { Scene } from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'
import 'aframe-physics-system'
import { FirstVendor, Box, Cursor, Floor } from '../components'

const Main = () => {
  return (
    <Scene
      id="scene"
      physics="debug: true"
      inspector="url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js"
      environment={{
        preset: 'starry',
        seed: 2,
        lighting: 'distant',
        lightPosition: { x: -0.110, y: 1.000, z: 0.330 },
        fog: 0.8,
        ground: 'hills',
        groundYScale: 6.31,
        groundTexture: 'none',
        groundColor: '#2c441f',
        grid: 'none'
      }}
      >
      <FirstVendor />
      <Cursor />
      <Box />
      <Floor />
    </Scene>
  )
}

ReactDOM.render(<Main />, document.getElementById('main'))
