import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Scene, Entity} from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'
import 'aframe-physics-system'
import { recognizeSpeech, checkAnswer } from '../utils'
import { FirstVendor, Player, Floor, HomeScreen } from './index'

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
const recognition = new SpeechRecognition()
const speechRecognitionList = new SpeechGrammarList()

class Main extends Component {
  constructor(props) {
    super(props)
    this.listen = this.listen.bind(this)
  }

  listen(rec, gram, event, ans){
    let langCode = 'es-419'
    let fromLang = 'es'
    let toLang = 'en'
    recognizeSpeech(rec, gram, event, ans, fromLang, toLang, langCode)
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
        <Player wasd-controls-enabled="false" />
        <HomeScreen />
        { gameState !== 'home-screen' ?
        <Entity>
          <FirstVendor listen={(ans) => this.listen(recognition, speechRecognitionList, SpeechRecognitionEvent, ans)}
            checkAnswer={checkAnswer}
          />
          <Floor />
        </Entity> : null }
      </Scene>
    )
  }
}

const mapStateToProps = ({ gameState }) => ({ gameState })

export default connect(mapStateToProps)(Main)
