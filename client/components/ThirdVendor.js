import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import {  Donut, Fish, DisplayCorrect, Hint, DisplayPromptResponses, Listening } from './index'
import { converse } from '../utils'

export class ThirdVendor extends React.Component {
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
      listeningAdjustPosition,
      setLoading
    } = this.props
    const vendorPosition = { x: -10, y: 1, z: 6.5 }
    const vendorRotation = { x: 10, y: 250, z: 0 }
    const textRotation = {x:0, y: 90, z: 0 }
    const displayHint = this.state.hintText && matchCharacter
    const displayListening = this.state.listening && matchCharacter
    return (
      <Entity>
        <Donut
          vendorPosition={vendorPosition}
          handleVendorClick={this.converse}
          vendorRotation={vendorRotation}
          matchCharacter={matchCharacter}
          setLoading={setLoading}
        />
        {
          matchCharacter &&
          <DisplayCorrect
            value={vendorResponse}
            position={{
              x: vendorPosition.x + correctAdjustPosition.x + 2,
              y: vendorPosition.y + correctAdjustPosition.y,
              z: vendorPosition.z + correctAdjustPosition.z + 1
            }}
            rotation={textRotation}
          />
        }
        {
          displayPromptResponses &&
          <DisplayPromptResponses
            vendorPosition={vendorPosition}
            promptAdjustPosition={promptAdjustPosition}
            responseAdjustPosition={responseAdjustPosition}
            currentPrompt={currentPrompt}
            rotation={textRotation}
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
            rotation={textRotation}
          />
        }
        {
          displayHint &&
          <Hint
            hint={this.state.hintText}
            position={{
              x: vendorPosition.x + hintAdjustPosition.x + 1.5,
              y: vendorPosition.y + hintAdjustPosition.y,
              z: vendorPosition.z + hintAdjustPosition.z
            }}
            color={'white'}
            rotation={textRotation}
          />
        }
        {this.state.questReward === 'donut' ?
          <Donut /> :
          this.state.questReward === 'fish' ?
            <Fish /> : null
        }
      </Entity>
    )
  }
}

export default ThirdVendor
