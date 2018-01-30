import React from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Entity } from 'aframe-react'
import { getGameState } from '../store'

const HomeScreen = (props) => {
  return (
    <Entity
      id="home-screen"
    >
      <Entity
        id="home-screen-sphere"
        primitive="a-sky"
        theta-length="90"
        width="2048"
        height="2048"
        radius="10"
      />
      <Entity
        id="home-screen"
        primitive="a-plane"
        height="6"
        width="20"
        position="0 3 -8"
      >
        <Entity
          id="enter-scene-plane"
          primitive="a-plane"
          height="1"
          width="2"
          position="0 0 .01"
          color="blue"
          events={{
            click: () => props.setGameState('game')
          }}
        >
          <Entity
            id="enter-scene-text"
            primitive="a-text"
            value="Enter Scene"
            color="white"
            align="center"
            position="0 0 0"
          />
        </Entity>
      </Entity>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
