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
      const look = this.props.gameState !== 'loading'
      return (
      <Entity
        primitive="a-camera"
        look-controls-enabled={look}
        wasd-controls-enabled={move}
      >
        <Cursor />
      </Entity>
    )
  }
}

const mapStateToProps = ({ gameState }) => ({ gameState })

export default connect(mapStateToProps)(Player)
