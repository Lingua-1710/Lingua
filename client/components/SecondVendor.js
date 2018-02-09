import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import { Woman, DisplayCorrect, Hint, DisplayPromptResponses, Fish, Cat, Listening } from './index'
import { converse } from '../utils'

export class SecondVendor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      incorrectCount: 0,
      hintText: '',
      success: false,
      questReward: '',
      listening: '',
      speechAccuracyThreshold: 0.85
    }
    this.converse = converse.bind(this)
  }

  render() {
    const {
      currentPrompt,
      vendorResponse,
      correctAdjustPosition,
      promptAdjustPosition,
      hintAdjustPosition,
      responseAdjustPosition,
      matchCharacter,
      displayPromptResponses,
      listeningAdjustPosition
    } = this.props
    const vendorPosition = { x: 10, y: 1, z: -7.5 }
    const vendorRotation = { x: 10, y: 190, z: 0 }
    const displayHint = this.state.hintText && matchCharacter
    const displayListening = this.state.listening && matchCharacter
    return (
      <Entity>
        <Woman
          vendorPosition={vendorPosition}
          handleVendorClick={this.converse}
          vendorRotation={vendorRotation}
        />
        {
          matchCharacter &&
          <DisplayCorrect
            value={vendorResponse}
            position={{
              x: vendorPosition.x,
              y: vendorPosition.y + 2,
              z: vendorPosition.z + correctAdjustPosition.z
            }}
          />
        }
        {
          displayPromptResponses &&
          <DisplayPromptResponses
            vendorPosition={vendorPosition}
            promptAdjustPosition={promptAdjustPosition}
            responseAdjustPosition={responseAdjustPosition}
            currentPrompt={currentPrompt}
          />
        }
        {
          displayListening &&
          <Listening
            position={{
              x: vendorPosition.x + listeningAdjustPosition.x,
              y: vendorPosition.y + listeningAdjustPosition.y,
              z: vendorPosition.z + listeningAdjustPosition.z
            }}
          />
        }
        {
          displayHint &&
          <Hint
            hint={this.state.hintText}
            position={{
              x: vendorPosition.x + hintAdjustPosition.x,
              y: vendorPosition.y + hintAdjustPosition.y,
              z: vendorPosition.z + hintAdjustPosition.z
            }}
          />
        }
        {this.state.questReward === 'cat' ?
          <Cat
            position={{
              x: vendorPosition.x,
              y: vendorPosition.y,
              z: vendorPosition.z + 2
            }}
          /> : null
        }
      </Entity>
    )
  }
}

export default SecondVendor
