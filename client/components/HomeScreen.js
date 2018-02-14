import React from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Entity } from 'aframe-react'

const HomeScreen = (props) => {
  const { gameState } = props
  return (
    gameState !== 'game' &&
    <Entity
      id="home-screen"
    >
      <img
        id="backdrop"
        src="/backgrounds/backdrop.jpg"
      />
      <Entity
        id="home-screen-sphere"
        primitive="a-sky"
        src="#backdrop"
        theta-length="90"
        width="window.innerWidth"
        height="window.innerHeight"
        radius="5"
      />
      <Entity
        id="home-screen"
        primitive="a-plane"
        src="#backdrop"
        height="10"
        width="10"
        position="0 2 -3.02"
      />
    </Entity>
  )
}

const mapStateToProps = ({ gameState }) => ({ gameState })

export default connect(mapStateToProps)(HomeScreen)
