/* SpeechRecognition webkitSpeechRecognition*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Scene, Entity} from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'
import { recognizeSpeech, checkAnswer, getCharacterPrompts } from '../utils'
import { FirstVendor, Player, HomeScreen } from './index'
import { fetchPrompts, translateResponse, fetchCharacters } from '../store'

class Main extends Component {
  constructor(props) {
    super(props)
    this.listen = this.listen.bind(this)
  }

  componentDidMount() {
    //response when character does not hear an expected response.
    const response = 'I do not understand'
    const { getVendorResponse, currentLanguage, getCharacters } = this.props
    const nativeLang = currentLanguage.nativeLang
    const learningLang = currentLanguage.learningLang
    getVendorResponse(response, nativeLang, learningLang)
    getCharacters()
  }

  listen(obj, options){
    return recognizeSpeech(obj, options)
  }

  render() {
    const { setPrompts, gameState, currentLanguage, characters } = this.props
    const nativeLang = currentLanguage.nativeLang
    const learningLang = currentLanguage.learningLang
    let characterPrompts = {}
    if (characters.length) {
      characters.forEach(character => {
        characterPrompts[character.id] = setPrompts(nativeLang, learningLang, character.id)
      })
    }
    return (
      <Scene
        id="scene"
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
        {(gameState === 'loading' || gameState === 'game' ) ?
        <Entity>
          <FirstVendor
            listen={this.listen}
            checkAnswer={checkAnswer}
            firstPromptId={1}
            characterId={1}
            // prompts={setPrompts(nativeLang, learningLang, 1)}
          />
        </Entity> : null }
      </Scene>
    )
  }
}

export const mapState = ({ gameState, prompts, currentLanguage, characters }) => ({ gameState, prompts, currentLanguage, characters })

export const mapDispatch = (dispatch) => {
  return {
    setPrompts: (learningLang, nativeLang, characterId) => dispatch(fetchPrompts(learningLang, nativeLang, characterId)),
    getVendorResponse: (response, learningLang, nativeLang) => dispatch(translateResponse(response, learningLang, nativeLang)),
    getCharacters: () => dispatch(fetchCharacters())
  }
}

export default connect(mapState, mapDispatch)(Main)
