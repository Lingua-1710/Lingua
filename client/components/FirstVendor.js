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
      vendorResponse: '',
      incorrectCount: 0,
      hintText: ''
    }
    this.converse = converse.bind(this)
  }

  render() {
    const vendorPosition = { x: 1, y: 1, z: -5 }
    const vendorRotation = { x: 10, y: 160, z: 0 }
    const correctAdjustPosition = { x: 1, y: -0.05, z: 2 }
    const promptAdjustPosition = { x: -2, y: 2, z: 0 }
    const hintAdjustPosition = { x: 0, y: -0.5, z: 2 }
    const responseAdjustPosition = { x: -2, y: 0.5, z: 1 }
    return (
      <Entity>
        <Octo
          vendorPosition={vendorPosition}
          handleVendorClick={this.converse}
          vendorRotation={vendorRotation}
        />
        {
          this.props.vendorResponse.length &&
          <DisplayCorrect
            value={this.state.vendorResponse}
            position={{
              x: vendorPosition.x,
              y: vendorPosition.y + 2,
              z: vendorPosition.z + correctAdjustPosition.z
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
                x: vendorPosition.x + promptAdjustPosition.x,
                y: vendorPosition.y + promptAdjustPosition.y,
                z: vendorPosition.z + promptAdjustPosition.z
              },
              align: 'center'
            }} />
            <ResponseText responseProps={{
              responses: this.props.currentPrompt.responses,
              color: 'black',
              position: {
                x: vendorPosition.x + responseAdjustPosition.x,
                y: vendorPosition.y + responseAdjustPosition.y,
                z: vendorPosition.z + responseAdjustPosition.z
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
              x: vendorPosition.x + hintAdjustPosition.x,
              y: vendorPosition.y + hintAdjustPosition.y,
              z: vendorPosition.z + hintAdjustPosition.z
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
