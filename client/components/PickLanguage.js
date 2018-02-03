import React from 'react'
import { Entity } from 'aframe-react'
import { connect } from 'react-redux'
import { getGameState } from '../store'

export const PickLanguage = (props) => {
  return (
    <Entity
      id="pick-language-plane"
      primitive="a-plane"
      height="1"
      width="2"
      position="0 0 .01"
      radius="2"
      color="grey"
      opacity="0"
      class="clickable"
      events={{
        click: () => props.setGameState('EnterScene')
      }}
    >
      <Entity
        id="pick-language-text"
        primitive="a-text"
        font="exo2bold"
        value="PICK YOUR LANGUAGE"
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

export default connect(null, mapDispatchToProps)(PickLanguage)
