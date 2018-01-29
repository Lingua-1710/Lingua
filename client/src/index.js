import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../store'
import 'aframe'
import { Scene } from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'
import 'aframe-physics-system'
import { recognizeSpeech } from '../utils'
import { FirstVendor, Box, Cursor, Floor } from '../components'

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
const recognition = new SpeechRecognition()
const speechRecognitionList = new SpeechGrammarList()

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answers: ['hola como estas', 'necesito el bano', 'puta madre']
    }
    this.listen = this.listen.bind(this)
  }

  listen(rec, gram, event, ans){
    let googLang = 'es'
    let langCode = 'es-419'
    recognizeSpeech(rec, gram, event, ans, googLang, langCode)
  }

  render() {
    return (
      <Provider store={store}>
      <Scene
        id="scene"
        physics="debug: true"
        inspector="url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js"
        environment={{
          preset: 'forest',
          seed: 2,
          lighting: 'distant',
          lightPosition: {
            x: -0.110,
            y: 1.000,
            z: 0.330
          },
          fog: 0.8,
          ground: 'hills',
          groundYScale: 6.31,
          groundTexture: 'none',
          groundColor: '#2c441f',
          grid: 'none'
        }}
      >
        <FirstVendor listen={() => this.listen(recognition, speechRecognitionList, SpeechRecognitionEvent, this.state.answers || ['hola como estas'])}/>
        <Cursor />
        <Floor />
      </Scene>
      </Provider>
    )
  }
}


ReactDOM.render(<Main />, document.getElementById('main'))


