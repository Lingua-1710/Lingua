import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import { connect } from 'react-redux'
import { getGameState } from '../store'

const EnterScene = (props) => {
  return (
    <Entity
      id="enter-scene-plane"
      primitive="a-plane"
      height="1"
      width="2"
      position="0 0 .01"
      color="blue"
      class="clickable"
      events={{
        click: () => props.setGameState('loading')
      }}
    >
      <Entity
        id="enter-scene-text"
        primitive="a-text"
        font=""
        value="Enter Scene"
        color="white"
        align="center"
        position="0 0 0"
      />
    </Entity>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGameState(gameState) {
      dispatch(getGameState(gameState))
    }
  }
}

export default connect(null, mapDispatchToProps)(EnterScene)
