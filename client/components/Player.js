import React from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Entity } from 'aframe-react'
import { Cursor } from './index'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scoreAdjustPosition: { x: 1, y: -.05, z: 2 },
    }
  }

  render() {
    const move = this.props.gameState === 'game'
    return (
      <Entity
        primitive="a-camera"
        wasd-controls-enabled={move}
        // sound="src: audio/LinguaTrack.mp3; autoplay: true; loop: true; volume: 0.1"
      >
        <Cursor />
      </Entity>
    )
  }
}

const mapStateToProps = ({ gameState }) => ({ gameState })

export default connect(mapStateToProps)(Player)
