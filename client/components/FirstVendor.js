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
  DisplayCorrect,
  Countdown } from './index'
import { fetchPrompts,
  getPrompt,
  translateResponse,
  respond } from '../store'
import {
  speechRecObject } from '../utils'

export class FirstVendor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lightPosition: { x: 2.5, y: 0.0, z: 0.0 },
      vendorPosition: { x: 1, y: 1, z: -5 },
      vendorRotation: { x: 10, y: 160, z: 0 },
      correctAdjustPosition: { x: 1, y: -.05, z: 2 },
      promptAdjustPosition: { x: -2, y: 2, z: 0 },
      promptIndex: 0,
      responseAdjustPosition: { x: -2, y: 0.5, z: 1 },
      language: {
        langCode: 'es-419',
        fromLang: 'es',
        toLang: 'en'
      },
      countdown: {counting: false, timer: 3},
      repeat: false,
      vendorResponse: 'I don\'t understand'
    }
    this.handleVendorClick = this.handleVendorClick.bind(this)
    this.listenToUser = this.listenToUser.bind(this)
    this.converse = this.converse.bind(this)
    this.reward = this.reward.bind(this)
    this.grade = this.grade.bind(this)
  }

  converse(repeating) {
    if(this.state.promptIndex < this.props.prompts.length) {
      if(!repeating) {
        this.setState({
          promptIndex: this.state.promptIndex + 1
        })
      }
      let prompts = this.props.prompts
      if(this.state.promptIndex < this.props.prompts.length) {
        this.props.setCurrentPrompt(prompts[this.state.promptIndex])
      } else {
        this.reward()
      }
      this.listenToUser()
      .then((speech) => {
        let result = this.grade(speech)
        if (result.correct) {
          this.setState({repeat: false})
          this.converse(false)
          this.props.clearResponse()
        } else {
          this.props.getVendorResponse(this.state.vendorResponse, this.state.language.toLang, this.state.language.fromLang)
          this.setState({repeat: true, vendorResponse: this.props.vendorResponse})
          this.converse(true)
        }
      })
    } else {
      this.reward(true)
    }
  }

  reward(done) {
    //temporary log until we have the rest of the logic for this down
    if(done) {
      console.log('I don\'t want to talk to you anymore')
    } else {
      console.log('good job duderino, you did the thing!')
    }
  }

  handleVendorClick() {
    this.converse(true)
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
    //below, setting default response for incorrect and default response on finish
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
          {
            this.props.vendorResponse.length &&
            <DisplayCorrect
              value={this.props.vendorResponse}
              position={{
                x: this.state.vendorPosition.x,
                y: this.state.vendorPosition.y + 2,
                z: this.state.vendorPosition.z + this.state.correctAdjustPosition.z
              }}
            />
          }
          {
            this.state.countdown.counting &&
            <Countdown
              time={this.state.countdown.timer}
              position={{
                x: this.state.vendorPosition.x,
                y: this.state.vendorPosition.y + 1.25,
                z: this.state.vendorPosition.z + this.state.correctAdjustPosition.z
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
    vendorResponse: storeState.vendorResponse
  }
}

export const mapDispatch = (dispatch) => {
  return {
    setPrompts: (fromLang, toLang) => dispatch(fetchPrompts(fromLang, toLang)),
    setCurrentPrompt: (prompt) => dispatch(getPrompt(prompt)),
    getVendorResponse: (response, fromLang, toLang) => dispatch(translateResponse(response, fromLang, toLang)),
    clearResponse: () => dispatch(respond(''))
  }
}

export default connect(mapState, mapDispatch)(FirstVendor)
