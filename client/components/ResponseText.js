import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import 'aframe-environment-component'
import { deAccent } from '../utils/accentRemover'

const ResponseText = (props) => {
  let yAdjust = 0
  const rotation = props.rotation
  let num = props.responses.length + 1
  const maxResponseCharLength = 24
  const maxWidth = 8
  return (
    <Entity>
      {
        props.responses.map(response => {
          const responseTextLength = response.text.length
          let position = {...props.position}
          position.y += yAdjust
          yAdjust++
          num--
          return (
            <Entity
              key={response.id}
              primitive='a-text'
              value={deAccent(`${num}: ${response.translation}`)}
              color={props.color}
              shader='msdf'
              font='https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/firasanscondensed/FiraSansCondensed-Regular.json'
              opacity="3"
              id={response.id}
              position={position}
              align={props.align}
              rotation={rotation}
              width={maxWidth - Math.floor(responseTextLength / maxResponseCharLength)}
            />
          )
        })
      }
    </Entity>
  )}

export default ResponseText
