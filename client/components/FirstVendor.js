import React from 'react'
import { connect } from 'react-redux'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'
import {
  FirstVendorStoreFront,
  PromptText,
  ResponseText,
  Octo,
  DisplayScore,
  DisplayCorrect,
  Countdown } from './index'
import { fetchPrompts, getPrompt, addToScore } from '../store'
import {
  SpeechRecognition,
  SpeechGrammarList,
  SpeechRecognitionEvent } from '../utils'

const speechRecObject = {
  SpeechRecognition,
  SpeechGrammarList,
  SpeechRecognitionEvent
}

export class FirstVendor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lightPosition: { x: 2.5, y: 0.0, z: 0.0 },
      vendorPosition: { x: 1, y: 1, z: -5 },
      vendorRotation: { x: 10, y: 160, z: 0 },
      scoreAdjustPosition: { x: 1, y: -.05, z: 2 },
      promptAdjustPosition: { x: -2, y: 2, z: 0 },
      promptIndex: 0,
      responseAdjustPosition: { x: -2, y: 0.5, z: 1 },
      language: {
        langCode: 'es-419',
        fromLang: 'es',
        toLang: 'en'
      },
      countdown: {counting: false, timer: 3}
    }
    this.handleVendorClick = this.handleVendorClick.bind(this)
    this.listenToUser = this.listenToUser.bind(this)
    this.converse = this.converse.bind(this)
    this.reward = this.reward.bind(this)
    this.grade = this.grade.bind(this)
  }

  converse(conversing) {
    if(this.state.promptIndex < this.props.prompts.length) {
      if(!conversing) {
        let prompts = this.props.prompts
        this.props.setCurrentPrompt(prompts[this.state.promptIndex])
        this.setState({
          promptIndex: this.state.promptIndex + 1,
          correctAnswer: this.props.currentPrompt.responses.find((res) => {
            return (res.isCorrect === true)
          })
        })
      }
      this.listenToUser()
      .then((speech) => {
        let result = this.grade(speech)
        if (result.correct) {
          console.log(result)
          this.converse(false)
        } else {
          this.converse(true)
        }
      })
    } else {
      this.reward()
    }
  }

  reward() {
    //temporary log until we have the rest of the logic for this down
    console.log('good job duderino, you did the thing!')
  }

  handleVendorClick() {
    this.converse(false)
  }

  listenToUser() {
    return this.props.listen(speechRecObject, {
      answers: this.props.currentPrompt.responses,
      language: this.state.language
    })
  }

  grade(answer) {
    return this.props.checkAnswer(answer, this.props.currentPrompt.responses)
  }

  componentDidMount() {
    this.props.setPrompts(this.state.language.toLang, this.state.language.fromLang)
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
            value={''}
            position={{
              x: this.state.vendorPosition.x,
              y: this.state.vendorPosition.y + 2,
              z: this.state.vendorPosition.z + this.state.scoreAdjustPosition.z
            }}
          />
          <DisplayScore
            score={this.props.score}
            position={{
              x: this.state.vendorPosition.x + this.state.scoreAdjustPosition.x,
              y: this.state.vendorPosition.y + this.state.scoreAdjustPosition.y,
              z: this.state.vendorPosition.z + this.state.scoreAdjustPosition.z
            }}
          />
          {
            this.state.countdown.counting &&
            <Countdown
              time={this.state.countdown.timer}
              position={{
                x: this.state.vendorPosition.x,
                y: this.state.vendorPosition.y + 1.25,
                z: this.state.vendorPosition.z + this.state.scoreAdjustPosition.z
              }}
            />
          }
          {
            this.props.currentPrompt.text &&
            <Entity>
              <PromptText promptProps={{
                value: this.props.currentPrompt.translation,
                color: 'white',
                id: 'prompt-text',
                width: '10',
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
