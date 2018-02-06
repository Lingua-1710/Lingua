import React, { Component } from 'react'
import 'aframe'
import { connect } from 'react-redux'
import { Entity } from 'aframe-react'
import { fetchPrompts, translateResponse, fetchQuests } from '../store'

class Loading extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //response when character does not hear an expected response.
    const response = 'I do not understand'
    const nativeLang = this.props.currentLanguage.nativeLang
    const learningLang = this.props.currentLanguage.learningLang
    this.props.setPrompts(nativeLang, learningLang)
    this.props.getVendorResponse(response, nativeLang, learningLang)
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
    getVendorResponse: (response, learningLang, nativeLang) => dispatch(translateResponse(response, learningLang, nativeLang)),
    getQuests: (() => dispatch(fetchQuests()))
  }
}

export default connect(mapState, mapDispatch)(Loading)
