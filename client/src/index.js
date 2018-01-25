import React from 'react'
import ReactDOM from 'react-dom'
import 'aframe'
import { Entity, Scene } from 'aframe-react'
import { setAttributes, COLORS, QUESTIONS, fetchRandomQuestion } from './utils'
import 'babel-polyfill'
import 'aframe-particle-system-component'
import 'aframe-physics-system'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      colorIndex: 0,
      question: ''
    }
  }

  _handleClick() {
    const sceneEl = document.getElementById('scene')
    const markerEl = document.getElementById('box')
    let text = document.getElementById('text')
    let prevQuestion = ''
    if (text) {
      prevQuestion = text.getAttribute('value')
      //remove text element if exists already
      text.parentNode.removeChild(text)
    }
    let position = markerEl.object3D.getWorldPosition()
    let newEl = document.createElement('a-text')
    position.y = position.y + 2
    let question = fetchRandomQuestion(QUESTIONS, prevQuestion)
    setAttributes(newEl, {
      color: 'black',
      value: question,
      id: 'text',
      position: position,
      align: 'center'
    })
    sceneEl.appendChild(newEl)
    this.setState({
      colorIndex: (this.state.colorIndex + 1) % COLORS.length
    })
  }

  render() {
    return (
      <Scene id="scene" physics="debug: true" inspector="url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js">
        <Entity id="camera" primitive="a-camera">
          <Entity primitive="a-cursor" />
        </Entity>
        <Entity
          id="floor"
          static-body
          primitive="a-box"
          depth="50"
          height="0.1"
          width="50"
          color="#2E3837"
          shader="flat"
          physics-body="mass: 0; boundingBox: 50 0.1 50"
          position="0 0 -10"
        />
        <Entity
          id="box"
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
