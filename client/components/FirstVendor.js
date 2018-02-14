import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import { FirstVendorStoreFront, Octo, DisplayCorrect, Hint, DisplayPromptResponses, Apple, GrilledCheese, Listening } from './index'
import { converse } from '../utils'

export default class FirstVendor extends React.Component {
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
    const vendorPosition = { x: 5, y: 1, z: -7.5 }
    const vendorRotation = { x: 10, y: 190, z: 0 }
    const displayHint = this.state.hintText && matchCharacter
    const displayListening = this.state.listening && matchCharacter
    return (
      <Entity>
        <Octo
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
              x: vendorPosition.x + correctAdjustPosition.x,
              y: vendorPosition.y + correctAdjustPosition.y,
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
            color={'white'}
          />
        }
        {this.state.questReward === 'apple' ?
          <Apple /> :
          this.state.questReward === 'cheese' ?
            <GrilledCheese /> : null
        }
        {/* <FirstVendorStoreFront /> */}
      </Entity>
    )
  }
}
