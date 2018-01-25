import React from 'react'
import ReactDOM from 'react-dom'
import 'aframe'
import { Entity, Scene } from 'aframe-react'
import 'babel-polyfill'
import 'aframe-particle-system-component'
import 'aframe-physics-system'

const COLORS = ['#D92B6A', '#9564F2', '#FFCF59']
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      colorIndex: 0,
      spherePosition: { x: 0.0, y: 4, z: -10.0 }
    }
  }

  _handleClick() {
    this.setState({
      colorIndex: (this.state.colorIndex + 1) % COLORS.length
    })
  }

  render() {
    return (
      <Scene physics="debug: true" inspector="url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js">
        <Entity primitive="a-camera" look-controls>
          <Entity
            primitive="a-cursor"
            cursor={{ fuse: false }}
            material={{ color: 'white', shader: 'flat', opacity: 0.75 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
            event-set__1={{
              _event: 'mouseenter',
              scale: { x: 1.4, y: 1.4, z: 1.4 }
            }}
            event-set__2={{
              _event: 'mouseleave',
              scale: { x: 1, y: 1, z: 1 }
            }}
            raycaster={{
              objects: '.clickable'
            }}
          />
        </Entity>
        <Entity
          static-body primitive="a-box" depth="50" height="0.1" width="50"
          material="color: #2E3837; shader: flat"
          physics-body="mass: 0; boundingBox: 50 0.1 50"
          position="0 0 -10" />
        <Entity
          class="clickable"
          dynamic-body
          primitive="a-box"
          material={{ shader: 'flat', color: COLORS[this.state.colorIndex] }}
          position={{ x: 0, y: 2, z: -5 }}
          events={{
            click: this._handleClick.bind(this)
          }}
        />
        <Entity particle-system={{ preset: 'snow' }} />
        <Entity light={{ type: 'point' }} />
        <Entity text={{ value: 'Hello, WebVR!' }} />
      </Scene>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'))
