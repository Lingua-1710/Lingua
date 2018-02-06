import React from 'react'
import 'aframe'
import { connect } from 'react-redux'
import { Entity } from 'aframe-react'

const Loading = (props) => {

  return (
    props.gameState === 'loading' ? <Entity
      id="enter-scene-plane"
      primitive="a-plane"
      height="1"
      width="2"
      opacity="0"
      position="0 0 .01"
      color="blue"
    >
      <Entity
        id="enter-scene-text"
        primitive="a-text"
        font="exo2bold"
        value="Loading"
        color="white"
        align="center"
        position="0 0 0"
      />
    </Entity>
    : null
  )
}

const mapStateToProps = ({ gameState }) => ({ gameState })

export default connect(mapStateToProps)(Loading)
