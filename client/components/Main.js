import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Scene, Entity} from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'
import 'aframe-physics-system'
import { recognizeSpeech } from '../utils'
import { FirstVendor, Player, Floor, HomeScreen } from './index'

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
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
    const { gameState } = this.props
    return (
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
            {gameState === 'home-screen' ?
            <HomeScreen /> :
            <Entity>
              <FirstVendor listen={() => this.listen(recognition, speechRecognitionList, SpeechRecognitionEvent, this.state.answers || ['hola como estas'])} />
              <Player />
              <Floor />
            </Entity>}
          </Scene>
    )
  }
}

const mapStateToProps = ({ gameState }) => ({ gameState })

export default connect(mapStateToProps)(Main)
