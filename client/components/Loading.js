import React, { Component } from 'react'
import 'aframe'
import { connect } from 'react-redux'
import { Entity } from 'aframe-react'
import { fetchPrompts, fetchCharacters } from '../store'

class Loading extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { setPrompts, currentLanguage, setCharacters } = this.props
    const nativeLang = currentLanguage.nativeLang
    const learningLang = currentLanguage.learningLang
    setPrompts(nativeLang, learningLang)
    setCharacters()
  }

  render() {
    return (
      this.props.gameState === 'loading' ? <Entity
        id="enter-scene-plane"
        primitive="a-plane"
        height="1"
        width="2"
        opacity="0"
        position="0 0 .01"
        color="blue"
      >
        <Entity
          id="enter-scene-text"
          primitive="a-text"
          font="exo2bold"
          value="Loading"
          color="white"
          align="center"
          position="0 0 0"
        />
      </Entity>
      : null
    )
  }
}

const mapState = ({ gameState, currentLanguage }) => ({ gameState, currentLanguage })

export const mapDispatch = (dispatch) => {
  return {
    setPrompts: (learningLang, nativeLang) => dispatch(fetchPrompts(learningLang, nativeLang)),
    setCharacters: () => dispatch(fetchCharacters()),
  }
}

export default connect(mapState, mapDispatch)(Loading)
