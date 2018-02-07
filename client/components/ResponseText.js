import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'
import { deAccent } from '../utils/accentRemover'

const ResponseText = (props) => {
  let yAdjust = 0
  return (
    <Entity>
      {
        props.responses.map((response) => {
          let position = Object.assign({}, props.position )
          position.y += yAdjust
          yAdjust += 0.27
          return (
            <Entity
              key={response.id}
              primitive='a-text'
              value={deAccent(response.translation)}
              color={props.color}
              shader='msdf'
              font='https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/firasanscondensed/FiraSansCondensed-Regular.json'
              opacity="3"
              id={response.id}
              position={position}
              align={props.align}
              />
          )
        })
      }
    </Entity>
  )}

export default ResponseText
