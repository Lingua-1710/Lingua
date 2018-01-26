import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import { FirstVendorStoreFront } from './index'
import { setAttributes, COLORS, QUESTIONS, fetchRandomQuestion } from '../utils'

class FirstVendor extends React.Component {
  constructor() {
    super()
    this.state = {
      colorIndex: 0
    }
  }

  handleVendorClick() {
    const sceneEl = document.getElementById('scene')
    const markerEl = document.getElementById('octo')
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
      <Entity>
        <Entity
          id="first-vendor"
          class="clickable"
          events={{
            click: this.handleVendorClick.bind(this)
          }}
        >
          <a-assests>
            <a-asset-item
              id="octo-obj"
              src="models/octo/ramenocto.obj" />
            <a-asset-item
              id="octo-mtl"
              src="models/octo/ramenoctomaterials.mtl" />
          </a-assests>
          <a-obj-model
            id="octo"
            src="#octo-obj"
            mtl="#octo-mtl"
            position="1 1 -4"
            rotation="10 180 0" />

          <Entity
            primitive="a-light"
            type="directional"
            color="#FFF"
            intensity={1}
            position={{ x: 2.5, y: 0.0, z: 0.0 }}
          />
        </Entity>
        <FirstVendorStoreFront />
      </Entity>
    )
  }
}

export default FirstVendor
