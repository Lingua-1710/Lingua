import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import { connect } from 'react-redux'
import { getGameState } from '../store'

export const EnterScene = (props) => {
  return (
    <Entity
      id="enter-scene-plane"
      primitive="a-plane"
      height="1"
      width="2"
      position="0 0 .01"
      radius="2"
      color="grey"
      opacity="0"
      class="clickable"
      events={{
        click: () => props.setGameState('language')
      }}
    >
      <Entity
        id="enter-scene-text"
        primitive="a-text"
        font="exo2bold"
        value="ENTER SCENE"
        height="12"
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
