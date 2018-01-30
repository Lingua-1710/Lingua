import React from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Entity } from 'aframe-react'
import { getGameState } from '../store'

const HomeScreen = (props) => {
  // handleBoxClick() {
  //   const sceneEl = document.getElementById('scene')
  //   const markerEl = document.getElementById('box')
  //   let text = document.getElementById('text')
  //   let prevQuestion = ''
  //   if (text) {
  //     prevQuestion = text.getAttribute('value')
  //     //remove text element if exists already
  //     text.parentNode.removeChild(text)
  //   }
  //   let position = markerEl.object3D.getWorldPosition()
  //   let newEl = document.createElement('a-text')
  //   position.y = position.y + 2
  //   let question = fetchRandomQuestion(QUESTIONS, prevQuestion)
  //   setAttributes(newEl, {
  //     color: 'black',
  //     value: question,
  //     id: 'text',
  //     position: position,
  //     align: 'center'
  //   })
  //   sceneEl.appendChild(newEl)
  //   this.setState({
  //     colorIndex: (this.state.colorIndex + 1) % COLORS.length
  //   })
  // }

  // const gameState = props.gameState
  return (
    <Entity
      id="plane"
      primitive="a-plane"
      height="6"
      width="6"
      position="0 3 -4"
    />
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
