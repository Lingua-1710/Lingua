import React from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import {
  FirstVendorStoreFront,
  PromptText,
  ResponseText,
  Octo,
  DisplayCorrect,
  Hint
} from './index'
import {
  getPrompt,
  translateResponse,
  respond
} from '../store'
import { speechRecObject } from '../utils'

export class FirstVendor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lightPosition: { x: 2.5, y: 0.0, z: 0.0 },
      vendorPosition: { x: 1, y: 1, z: -5 },
      vendorRotation: { x: 10, y: 160, z: 0 },
      correctAdjustPosition: { x: 1, y: -0.05, z: 2 },
      promptAdjustPosition: { x: -2, y: 2, z: 0 },
      hintAdjustPosition: {x: 0, y: -0.5, z: 2},
      responseAdjustPosition: { x: -2, y: 0.5, z: 1 },
      vendorResponse: 'I do not understand',
      incorrectCount: 0,
      hintText: ''
    }
    this.handleVendorClick = this.handleVendorClick.bind(this)
    this.listenToUser = this.listenToUser.bind(this)
    this.converse = this.converse.bind(this)
    this.reward = this.reward.bind(this)
    this.grade = this.grade.bind(this)
  }

  converse() {
    let currentPrompt = this.props.currentPrompt
    if(!Object.keys(this.props.currentPrompt).length) {
      let firstPrompt = this.props.prompts.find((prompt) => {
        return prompt.id === this.props.firstPromptId
      })
      currentPrompt = firstPrompt
      this.props.setCurrentPrompt(currentPrompt)
    }
    this.listenToUser(currentPrompt)
    .then((speech) => {
      let result = this.grade(speech)
      if (result) {
        this.setState({
          incorrectCount: 0,
          hintText: `You said: ${result.text}`
        })
        let nextPrompt = this.props.prompts.find((prompt) => {
          return prompt.id === result.prompt_responses.nextPromptId
        })
        if(nextPrompt) {
          this.props.setCurrentPrompt(nextPrompt)
          this.converse()
        } else {
          this.reward()
          this.props.setCurrentPrompt({})
          this.setState({hintText: ''})
        }
        this.props.clearResponse()
      } else {
        this.setState({incorrectCount: this.state.incorrectCount + 1})
        if(this.state.incorrectCount > 1) {
          this.setState({hintText: `The vendor said: ${this.props.currentPrompt.text}`})
        }
        this.props.getVendorResponse(this.state.vendorResponse, this.props.language.nativeLang, this.props.language.learningLang)
        this.setState({vendorResponse: this.props.vendorResponse})
        this.converse()
      }
    })
  }

  reward(done) {
    //temporary log until we have the rest of the logic for this down
    console.log('good job duderino, you did the thing!')
  }

  handleVendorClick() {
    this.converse()
  }

  listenToUser(currentPrompt) {
    return this.props.listen(speechRecObject, {
      responses: currentPrompt.responses,
      language: this.props.language
    })
  }

  grade(answer) {
    return this.props.checkAnswer(answer, this.props.currentPrompt.responses)
  }

  render() {
    if (this.props.prompts) {
      return (
        <Entity>
          <Octo
            vendorPosition={this.state.vendorPosition}
            handleVendorClick={this.handleVendorClick}
            vendorRotation={this.state.vendorRotation}
          />
          {
            this.props.vendorResponse.length &&
            <DisplayCorrect
              value={this.props.vendorResponse}
              position={{
                x: this.state.vendorPosition.x,
                y: this.state.vendorPosition.y + 2,
                z: this.state.vendorPosition.z + this.state.correctAdjustPosition.z
              }}
            />
          }
          {
            this.props.currentPrompt.text &&
            <Entity>
              <PromptText promptProps={{
                value: this.props.currentPrompt.translation,
                color: 'white',
                id: 'prompt-text',
                width: '10',
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
          {
            this.state.hintText.length &&
            <Hint
              hint={this.state.hintText}
              position={{
                x: this.state.vendorPosition.x + this.state.hintAdjustPosition.x,
                y: this.state.vendorPosition.y + this.state.hintAdjustPosition.y,
                z: this.state.vendorPosition.z + this.state.hintAdjustPosition.z
              }}
            />
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
    prompts: storeState.prompts,
    currentPrompt: storeState.currentPrompt,
    vendorResponse: storeState.vendorResponse,
    language: storeState.currentLanguage
  }
}

export const mapDispatch = (dispatch) => {
  return {
    setCurrentPrompt: (prompt) => dispatch(getPrompt(prompt)),
    getVendorResponse: (response, learningLang, nativeLang) => dispatch(translateResponse(response, learningLang, nativeLang)),
    clearResponse: () => dispatch(respond(''))
  }
}

export default connect(mapState, mapDispatch)(FirstVendor)
