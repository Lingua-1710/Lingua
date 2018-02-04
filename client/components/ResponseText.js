import React from 'react'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'

const ResponseText = (props) => {
  let yAdjust = 0
  return (
    <Entity>
      {
        props.responseProps.responses.map((response) => {
          let position = Object.assign({}, props.responseProps.position )
          position.y += yAdjust
          yAdjust += 0.27
          return (
            <Entity
              key={response.id}
              primitive='a-text'
              value={response.translation}
              color={props.responseProps.color}
              opacity="3"
              id={response.id}
              position={position}
              align={props.responseProps.align}
              />
          )
        })
      }
    </Entity>
  )}

export default ResponseText
