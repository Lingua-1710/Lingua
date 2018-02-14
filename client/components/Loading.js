import React from 'react'
import 'aframe'
import { connect } from 'react-redux'
import { Entity } from 'aframe-react'
import { fetchPrompts, fetchCharacters, getGameState } from '../store'

class Loading extends React.Component {
  componentDidMount() {
    const { setPrompts, currentLanguage, setCharacters } = this.props
    const nativeLang = currentLanguage.nativeLang
    const learningLang = currentLanguage.learningLang
    setPrompts(nativeLang, learningLang)
    setCharacters()
  }

  componentDidUpdate() {
    const finishedLoading = Object.values(this.props.loading).every(asset => asset)
    if (finishedLoading) this.props.setGameState('game')
  }

  render() {
    const { loading } = this.props
    const finishedLoading = Object.values(loading).every(asset => asset)
    return (
      !finishedLoading &&
      <Entity
        id="enter-scene-plane"
        primitive="a-plane"
        height="1"
        width="2"
        opacity="0"
        position="0 2 -3.01"
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
    )
  }
}

const mapState = ({ currentLanguage, loading }) => ({ currentLanguage, loading })

export const mapDispatch = (dispatch) => {
  return {
    setPrompts: (learningLang, nativeLang) => dispatch(fetchPrompts(learningLang, nativeLang)),
    setCharacters: () => dispatch(fetchCharacters()),
    setGameState: gameState => dispatch(getGameState(gameState))
  }
}

export default connect(mapState, mapDispatch)(Loading)
