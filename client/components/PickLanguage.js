import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import { connect } from 'react-redux'
import { getGameState, setLanguage, fetchLanguages } from '../store'

export class PickLanguage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedQuestId: -1
    }
  }

  componentDidMount() {
    this.props.grabLanguages()
  }

  render() {
    const selectedLanguage = this.state.selectedLanguage
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
          position="0 1.5 0"
        />
        {
          this.props.languages &&
          this.props.languages.map((language, index) => {
            return (
              <Entity
                key={language.id}
                id="pick-language-plane"
                primitive="a-plane"
                height=".5"
                width="2"
                position={`0 ${1 - index * .5} 0`}
                radius="0"
                color="blue"
                opacity="0"
                class="clickable"
                events={{
                  click: () => {
                    this.props.chooseLanguage({
                      nativeLang: 'en',
                      learningLang: language.google,
                      learningLangCode: language.code
                    })
                    this.setState({ selectedLanguage: language.id})
                  }
                }}
              >
                <Entity
                  id="pick-language-text"
                  primitive="a-text"
                  font="exo2bold"
                  value={language.name}
                  height="12"
                  color={selectedLanguage === language.id ? 'green' : 'white'}
                  align="center"
                  position={`0 0 .01`}
                />
              </Entity>
            )
          })
        }
        <Entity
          id="button-plane"
          primitive="a-plane"
          height=".5"
          width="2"
          position="0 -1.5 0"
          radius="0"
          color="blue"
          class="clickable"
          events={{
            click: () => this.props.setGameState('quest')
          }}
        >
        <Entity
          id="ready-button"
          primitive="a-text"
          font="exo2bold"
          value="SELECT"
          height="12"
          color="white"
          align="center"
          position="0 0 .01"
        />
    </Entity>
      </Entity>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGameState(gameState) {
      dispatch(getGameState(gameState))
    },
    grabLanguages() {
      dispatch(fetchLanguages())
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
