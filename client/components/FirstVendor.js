import React from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import { FirstVendorStoreFront, PromptText } from './index'
import { setAttributes, COLORS, QUESTIONS, fetchRandomQuestion } from '../utils'
import { fetchPrompts, getPrompt } from '../store'

class FirstVendor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nativeLang: 'en',
      learningLang: 'es',
      colorIndex: 0,
      lightPosition: { x: 2.5, y: 0.0, z: 0.0 },
      vendorPosition: {x: 1, y: 1, z: -4},
      vendorRotation: "10 180 0",
      promptAdjustPosition: {x: 0, y: 2, z: 0},
      promptIndex: 0
    }
  }

  handleVendorClick() {
    this.props.setCurrentPrompt(this.props.prompts[this.state.promptIndex].text)
    let index = this.state.promptIndex
    if(index < this.props.prompts.length - 1) {
      index++
    }
    this.setState({promptIndex: index})
    // const sceneEl = document.getElementById('scene')
    // const markerEl = document.getElementById('octo')
    // let text = document.getElementById('text')
    // let prevQuestion = ''
    // if (text) {
    //   prevQuestion = text.getAttribute('value')
    //   //remove text element if exists already
    //   text.parentNode.removeChild(text)
    // }
    // let position = markerEl.object3D.getWorldPosition()
    // let newEl = document.createElement('a-text')
    // position.y = position.y + 2
    // let question = fetchRandomQuestion(QUESTIONS, prevQuestion)
    // setAttributes(newEl, {
    //   color: 'black',
    //   value: question,
    //   id: 'text',
    //   position: position,
    //   align: 'center'
    // })
    // sceneEl.appendChild(newEl)
    // this.setState({
    //   colorIndex: (this.state.colorIndex + 1) % COLORS.length
    // })
    this.props.listen('es', 'en', 'es-419')
  }

  // componentDidUpdate() {
  //   if(this.props.userSpeech.data) {
  //     const sceneEl = document.getElementById('scene')
  //     const markerEl = document.getElementById('octo')
  //     let text = document.getElementById('answer-text')
  //     if (text) {
  //       text.parentNode.removeChild(text)
  //     }
  //     let position = markerEl.object3D.getWorldPosition()
  //     position.z = position.z + 3
  //     let newEl = document.createElement('a-text')
  //     let answer = this.props.userSpeech.data
  //     setAttributes(newEl, {
  //       color: 'black',
  //       value: answer,
  //       id: 'answer-text',
  //       position: position,
  //       align: 'center'
  //     })
  //     sceneEl.appendChild(newEl)
  //   }
  // }

  componentDidMount() {
    this.props.setPrompts(this.state.nativeLang, this.state.learningLang)
  }

  render() {
    if(this.props.prompts) {
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
              position={
                Object.keys(this.state.vendorPosition)
                .map(key => this.state.vendorPosition[key])
                .join(' ')
              }
              rotation="10 180 0"
            />
            <Entity
              primitive="a-light"
              type="directional"
              color="#FFF"
              intensity={1}
              position={{ x: 2.5, y: 0.0, z: 0.0 }}
            />
          </Entity>
          {
            this.props.currentPrompt.length &&
            <PromptText promptProps={{
              value: this.props.currentPrompt,
              color: 'black',
              id: 'prompt-text',
              position: {x: this.state.vendorPosition.x + this.state.promptAdjustPosition.x,
                y: this.state.vendorPosition.y + this.state.promptAdjustPosition.y,
                z: this.state.vendorPosition.z + this.state.promptAdjustPosition.z
              },
              align: 'center'
            }}/>
          }
          <FirstVendorStoreFront />
        </Entity>
      )
    } else {
      return null
    }
  }
}

const mapState = (storeState) => {
  return {
    userSpeech: storeState.speech,
    prompts: storeState.prompts,
    currentPrompt: storeState.currentPrompt
  }
}

const mapDispatch = (dispatch) => {
  return {
    setPrompts: (fromLang, toLang) => dispatch(fetchPrompts(fromLang, toLang)),
    setCurrentPrompt: (prompt) => dispatch(getPrompt(prompt))
  }
}

export default connect(mapState, mapDispatch)(FirstVendor)
