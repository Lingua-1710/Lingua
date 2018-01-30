import React from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Entity } from 'aframe-react'
import { Cursor } from './index'

const Player = (props) => {
  const move = props.gameState !== 'home-screen'
  return (
    <Entity primitive="a-camera" wasd-controls-enabled={move} >
      <Cursor />
    </Entity>
  )
}

const mapStateToProps = ({ gameState }) => ({ gameState })

export default connect(mapStateToProps)(Player)
