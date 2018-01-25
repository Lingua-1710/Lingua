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
      colorIndex: 0
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
        <Entity primitive="a-camera">
          <Entity primitive="a-cursor" />
        </Entity>
        <Entity
          static-body
          primitive="a-box"
          depth="50"
          height="0.1"
          width="50"
          color="#2E3837"
          shader="flat"
          physics-body="mass: 0; boundingBox: 50 0.1 50"
          position="0 0 -10" />
        <Entity
          geometry={{primitive: 'box'}}
          dynamic-body
          material={{color: COLORS[this.state.colorIndex] }}
          position={{ x: 0, y: 2, z: -5 }}
          events={{
            click: this._handleClick.bind(this)
          }}
        />
      </Scene>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'))
