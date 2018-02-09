import React from 'react'
import { Entity } from 'aframe-react'
import { PromptText, ResponseText } from '../index'

const DisplayCorrect = (props) => {
  const { vendorPosition, promptAdjustPosition, responseAdjustPosition, currentPrompt, rotation } = props
  return (
    <Entity>
      <PromptText
        value={currentPrompt.translation}
        color={'white'}
        id={'prompt-text'}
        width={'10'}
        position={{
          x: vendorPosition.x + promptAdjustPosition.x,
          y: vendorPosition.y + promptAdjustPosition.y,
          z: vendorPosition.z + promptAdjustPosition.z
        }}
        rotation={rotation}
        align={'center'}
      />
      <ResponseText
        responses={currentPrompt.responses}
        color={'black'}
        position={{
          x: vendorPosition.x + responseAdjustPosition.x,
          y: vendorPosition.y + responseAdjustPosition.y,
          z: vendorPosition.z + responseAdjustPosition.z
        }}
        rotation={rotation}
        align={'center'}
      />
    </Entity>
  )
}

export default DisplayCorrect
