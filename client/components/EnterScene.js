import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import { connect } from 'react-redux'
import { getGameState } from '../store'

export const EnterScene = (props) => {
  return (
    props.gameState === 'home-screen' &&
    <Entity
      id="enter-scene-plane"
      primitive="a-plane"
      height="1"
      width="2"
      position="0 2 -3.01"
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
        value="Sign In"
        height="12"
        color="white"
        align="center"
        position="0 0 0"
      />
    </Entity>
  )
}

const mapStateToProps = ({ gameState }) => ({ gameState })

const mapDispatchToProps = (dispatch) => {
  return {
    setGameState(gameState) {
      dispatch(getGameState(gameState))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterScene)
