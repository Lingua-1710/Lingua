import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import { connect } from 'react-redux'
import { getGameState } from '../store'
import { setLanguage } from '../store/index'


export class PickLanguage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
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
      >
        <Entity
          id="pick-language-text"
          primitive="a-text"
          font="exo2bold"
          value="PICK A LANGUAGE"
          height="12"
          color="white"
          align="center"
          position="0 0 0"
        />

        {
          this.props.languages &&
          this.props.languages.map((language, index) => {
            return (
              <Entity
                key={language.id}
                id="pick-language-text"
                primitive="a-text"
                font="exo2bold"
                value={language.name}
                height="12"
                color="white"
                align="center"
                position={`0 ${-0.35 + index * -0.3} 0`}
                class="clickable"
                events={{
                  click: () => this.props.chooseLanguage({
                    nativeLang: 'en',
                    learningLang: language.google,
                    learningLangCode: language.code
                  })
                }}
              />
            )
          })
        }
        <Entity
          id="ready-button"
          primitive="a-text"
          font="exo2bold"
          value="START"
          height="12"
          color="white"
          align="center"
          position="0 -1.5 0"
          class="clickable"
          events={{
            click: () => this.props.setGameState('game')
          }}
        />
      </Entity>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setGameState(gameState) {
      dispatch(getGameState(gameState))
    },
    chooseLanguage(language) {
      dispatch(setLanguage(language))
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    languages: storeState.languages
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PickLanguage)
