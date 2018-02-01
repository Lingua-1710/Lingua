import React from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import { FirstVendorStoreFront, PromptText, ResponseText } from './index'
import { fetchPrompts, getPrompt, addToScore } from '../store'
import { SpeechRecognition, SpeechGrammarList, SpeechRecognitionEvent } from '../utils'

export class FirstVendor extends React.Component {
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
      promptIndex: 0,
      responseAdjustPosition: { x: 0, y: 1, z: 0 },
      language: {
        langCode: 'es-419',
        fromLang: 'es',
        toLang: 'en'
      },
      appResponse: ''
    }
  }

  handleVendorClick() {
    if(Object.keys(this.props.currentPrompt).length) {
      this.props.setCurrentPrompt(this.props.prompts[this.state.promptIndex])
    } else {
      this.props.setCurrentPrompt(this.props.prompts[0])
    }
    let index = this.state.promptIndex
    if(index < this.props.prompts.length - 1) {
      index++
      this.setState({promptIndex: index})
    } else {
      this.setState({promptIndex: 0})
    }
    this.setState({
      correctAnswer: this.props.currentPrompt.responses.find((res) => {
        return(res.isCorrect === true)
      })})
    this.props.listen(speechRecObject, {
        answers: this.props.currentPrompt.responses,
        language: this.state.language
    })
  }

  shouldComponentUpdate(nextProps) {
    if((this.props.userSpeech !== nextProps.userSpeech) || this.props.currentPrompt.id !== nextProps.currentPrompt.id) {
      return true
    }
    return false
  }

  componentDidMount() {
    this.props.setPrompts(this.state.nativeLang, this.state.learningLang)
  }

  componentDidUpdate() {
    let userInput = this.props.userSpeech
    if(userInput.length) {
      let result = this.props.checkAnswer(userInput, this.props.currentPrompt.responses)
      let appResponse = (`You said: ${userInput},
      ${result.answer ? `Which matched: ${result.answer}.` : 'I am not sure what you meant.'}
      ${result.correct ? 'This was correct!' : 'This was incorrect.'}`)
      if(result.correct) {
        this.props.incrementScore()
      }
    }
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
            this.props.currentPrompt.text &&
            <Entity>
            <PromptText promptProps={{
              value: this.props.currentPrompt.translation,
              color: 'black',
              id: 'prompt-text',
              position: {
                x: this.state.vendorPosition.x + this.state.promptAdjustPosition.x,
                y: this.state.vendorPosition.y + this.state.promptAdjustPosition.y,
                z: this.state.vendorPosition.z + this.state.promptAdjustPosition.z
              },
              align: 'center'
            }} />
            <ResponseText responseProps={{
                responses: this.props.currentPrompt.responses,
                color: 'black',
                position: {
                  x: this.state.vendorPosition.x + this.state.responseAdjustPosition.x,
                  y: this.state.vendorPosition.y + this.state.responseAdjustPosition.y,
                  z: this.state.vendorPosition.z + this.state.responseAdjustPosition.z
                },
                align: 'center'
            }} />
            </Entity>
          }
          <FirstVendorStoreFront />
        </Entity>
      )
    } else {
      return null
    }
  }
}

export const mapState = (storeState) => {
  return {
    userSpeech: storeState.speech,
    prompts: storeState.prompts,
    currentPrompt: storeState.currentPrompt,
    score: storeState.score
  }
}

export const mapDispatch = (dispatch) => {
  return {
    setPrompts: (fromLang, toLang) => dispatch(fetchPrompts(fromLang, toLang)),
    setCurrentPrompt: (prompt) => dispatch(getPrompt(prompt)),
    incrementScore: () => dispatch(addToScore())
  }
}

export default connect(mapState, mapDispatch)(FirstVendor)
