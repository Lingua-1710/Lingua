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
      grade: {response: '', attempts: 3},
      language: {
        langCode: 'es-419',
        fromLang: 'es',
        toLang: 'en'
      },
      countdown: {counting: false, timer: 3},
      repeat: false,
      gameOver: false
    }
    this.handleVendorClick = this.handleVendorClick.bind(this)
    this.listenToUser = this.listenToUser.bind(this)
  }

  handleVendorClick() {
    if(!this.state.gameOver) {
      if(!this.state.repeat) {
        if (Object.keys(this.props.currentPrompt).length) {
          this.props.setCurrentPrompt(this.props.prompts[this.state.promptIndex])
        } else {
          this.props.setCurrentPrompt(this.props.prompts[0])
        }
        if (this.state.promptIndex < this.props.prompts.length - 1) {
          this.setState({ promptIndex: this.state.promptIndex + 1 })

        }
        this.setState({
          correctAnswer: this.props.currentPrompt.responses.find((res) => {
            return (res.isCorrect === true)
          })
        })
      }
        this.setState({repeat: true})
        this.listenToUser()
      if(this.state.promptIndex === this.props.prompts.length) {
        this.setState({
          grade: {response: `The end! Your score is: ${this.state.score}`},
          gameOver: true
        })
      }
    }
  }

  listenToUser() {
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
          setTimeout(() => {
            this.setState({
              grade: {response: '', attempts: 3}
            })
          }, 1500)
        } else {
          setTimeout(() => {
            this.setState({
              grade: {response: '', attempts: this.state.grade.attempts}
            })
          }, 3000)
        }
        this.handleUserGrade(graded.correct)
      })
  }

  handleUserGrade(grade) {
    if (grade) {
      this.setState({
        grade: {response: 'Correct! Click for next prompt', attempts: 3},
        repeat: false
      })
    } else {
      if (this.state.grade.attempts > 0) {
        this.setState({
            repeat: true,
            grade: {response: 'Try again in', attempts: this.state.grade.attempts},
            countdown: {counting: true, timer: this.state.countdown.timer}
          })
        let countdown = setInterval(() => {
          if (this.state.countdown.timer <=0) {
            this.listenToUser()
            this.setState({
              countdown: {counting: false, timer: 3}
            })
            clearInterval(countdown)
          } else {
            this.setState({
              countdown: {counting: true, timer: this.state.countdown.timer - 1}
            })
          }
        }, 1000)
        this.setState({
          grade: {attempts: this.state.grade.attempts - 1, response: this.state.grade.response}
        })
      } else {
        this.setState({
          repeat: false,
          grade: {response: 'There was an attempt. Click for next prompt...', attempts: 3}
        })
      }
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
            value={this.state.grade.response}
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
