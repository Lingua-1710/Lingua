import React from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import { FirstVendorStoreFront, PromptText, ResponseText, Octo, DisplayScore, DisplayCorrect } from './index'
import { fetchPrompts, getPrompt, addToScore } from '../store'
import { SpeechRecognition, SpeechGrammarList, SpeechRecognitionEvent } from '../utils'

export class FirstVendor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lightPosition: { x: 2.5, y: 0.0, z: 0.0 },
      vendorPosition: { x: 3, y: 1, z: -5.5 },
      vendorRotation: { x: 10, y: 180, z: 0 },
      scoreAdjustPosition: { z: 2 },
      promptAdjustPosition: { x: 0, y: 2, z: 0 },
      promptIndex: 0,
      responseAdjustPosition: { x: 0, y: 1, z: 0 },
      grade: '',
      language: {
        langCode: 'es-419',
        fromLang: 'en',
        toLang: 'es'
      }
    }
    this.handleVendorClick = this.handleVendorClick.bind(this)
  }

  handleVendorClick() {
    if (Object.keys(this.props.currentPrompt).length) {
      this.props.setCurrentPrompt(this.props.prompts[this.state.promptIndex])
    } else {
      this.props.setCurrentPrompt(this.props.prompts[0])
    }
    let index = this.state.promptIndex
    if (index < this.props.prompts.length - 1) {
      index++
      this.setState({ promptIndex: index })
    } else {
      this.setState({ promptIndex: 0 })
    }
    this.setState({
      correctAnswer: this.props.currentPrompt.responses.find((res) => {
        return (res.isCorrect === true)
      })
    })
    this.props.listen(speechRecObject, {
      answers: this.props.currentPrompt.responses,
      language: this.state.language
    })
      .then((result) => {
        return this.props.checkAnswer(result, this.props.currentPrompt.responses)
      })
      .then((graded) => {
        if (graded.correct) {
          this.props.incrementScore()
        }
        this.handleUserGrade(graded.correct)
        setTimeout(() => {
          this.setState({ grade: '' })
        }, 1500)
      })
  }

  handleUserGrade(grade) {
    if (grade) {
      this.setState({ grade: 'ok' })
    } else {
      this.setState({ grade: 'bad choice' })
    }
  }

  componentDidMount() {
    this.props.setPrompts(this.state.language.fromLang, this.state.language.toLang)
  }

  render() {
    if (this.props.prompts) {
      return (
        <Entity>
          <Octo
            vendorPosition={this.state.vendorPosition}
            handleVendorClick={this.handleVendorClick}
            vendorRotation={this.state.vendorRotation}
          />
          <DisplayCorrect
            value={this.state.grade}
            position={{
              x: this.state.vendorPosition.x,
              y: this.state.vendorPosition.y + 2,
              z: this.state.vendorPosition.z + this.state.scoreAdjustPosition.z
            }}
          />
          <DisplayScore
            score={this.props.score}
            position={{
              x: this.state.vendorPosition.x,
              y: this.state.vendorPosition.y,
              z: this.state.vendorPosition.z + this.state.scoreAdjustPosition.z
            }}
          />
          {
            this.props.currentPrompt.text &&
            <Entity>
              <PromptText promptProps={{
                value: this.props.currentPrompt.translation,
                color: 'black',
                id: 'prompt-text',
                position: {
                  x: this.state.vendorPosition.x + this.state.promptAdjustPosition.x,
                  y: this.state.vendorPosition.y + this.state.promptAdjustPosition.y,
                  z: this.state.vendorPosition.z + this.state.promptAdjustPosition.z
                },
                align: 'center'
              }} />
              <ResponseText responseProps={{
                responses: this.props.currentPrompt.responses,
                color: 'black',
                position: {
                  x: this.state.vendorPosition.x + this.state.responseAdjustPosition.x,
                  y: this.state.vendorPosition.y + this.state.responseAdjustPosition.y,
                  z: this.state.vendorPosition.z + this.state.responseAdjustPosition.z
                },
                align: 'center'
              }} />
            </Entity>
          }
          <FirstVendorStoreFront />
        </Entity>
      )
    } else {
      return null
    }
  }
}

export const mapState = (storeState) => {
  return {
    prompts: storeState.prompts,
    currentPrompt: storeState.currentPrompt,
    score: storeState.score
  }
}

export const mapDispatch = (dispatch) => {
  return {
    setPrompts: (fromLang, toLang) => dispatch(fetchPrompts(fromLang, toLang)),
    setCurrentPrompt: (prompt) => dispatch(getPrompt(prompt)),
    incrementScore: () => dispatch(addToScore())
  }
}

export default connect(mapState, mapDispatch)(FirstVendor)
