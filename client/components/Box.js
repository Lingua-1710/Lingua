import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import { setAttributes, COLORS, QUESTIONS, fetchRandomQuestion } from './utils'

class Box extends React.Component {
  constructor() {
    super()
    this.state = {
      colorIndex: 0
    }
  }

  handleBoxClick() {
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
      <Entity
        id="box"
        geometry={{primitive: 'box'}}
        dynamic-body
        material={{color: COLORS[this.state.colorIndex] }}
        position={{ x: 0, y: 2, z: -5 }}
        events={{
          click: this.handleBoxClick.bind(this)
        }}
      />
    )
  }
}

export default Box
