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
import { converse } from '../utils'

export class FirstVendor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lightPosition: { x: 2.5, y: 0.0, z: 0.0 },
      vendorPosition: { x: 1, y: 1, z: -5 },
      vendorRotation: { x: 10, y: 160, z: 0 },
      correctAdjustPosition: { x: 1, y: -0.05, z: 2 },
      promptAdjustPosition: { x: -2, y: 2, z: 0 },
      hintAdjustPosition: { x: 0, y: -0.5, z: 2 },
      responseAdjustPosition: { x: -2, y: 0.5, z: 1 },
      vendorResponse: 'I do not understand',
      incorrectCount: 0,
      hintText: ''
    }
    this.converse = converse.bind(this)
  }

  render() {
    return (
      <Entity>
        <Octo
          vendorPosition={this.state.vendorPosition}
          handleVendorClick={this.converse}
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
