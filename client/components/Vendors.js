import React from 'react'
import { Entity } from 'aframe-react'
import { checkAnswer, recognizeSpeech } from '../utils'
import { connect } from 'react-redux'
import { FirstVendor, SecondVendor, ThirdVendor } from './index'

const Vendors = (props) => {
  const firstVendorId = 1, secondVendorId = 2, thirdVendorId = 3
  const characterPrompts = props.characterPrompts
  return (
    props.gameState === 'loading' || props.gameState === 'game' &&
    <Entity>
      <FirstVendor
        listen={recognizeSpeech}
        checkAnswer={checkAnswer}
        firstPromptId={1}
        characterId={firstVendorId}
        prompts={characterPrompts[firstVendorId]}
      />
      <SecondVendor
        listen={recognizeSpeech}
        checkAnswer={checkAnswer}
        firstPromptId={8}
        characterId={secondVendorId}
        prompts={characterPrompts[secondVendorId]}
      />
      <ThirdVendor
        listen={recognizeSpeech}
        checkAnswer={checkAnswer}
        firstPromptId={17}
        characterId={thirdVendorId}
        prompts={characterPrompts[thirdVendorId]}
      />
    </Entity>
  )
}

const mapState = ({ gameState, currentLanguage }) => ({ gameState, currentLanguage })

export default connect(mapState)(Vendors)
