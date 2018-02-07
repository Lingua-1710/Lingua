import { checkAnswer, speechRecObject } from './speech'

export const converse = function () {
  this.listenToUser = listenToUser.bind(this)
  this.grade = grade.bind(this)
  let currentPrompt = this.props.currentPrompt
  const characterId = this.props.characterId
  // check if the character was clicked for the first time OR new vendor is clicked
  if (!Object.keys(currentPrompt).length || this.props.currentCharacter !== characterId) {
    let firstPrompt = this.props.prompts.find((prompt) => {
      return prompt.id === this.props.firstPromptId
    })
    currentPrompt = firstPrompt
    this.props.setCurrentPrompt(currentPrompt)
    if (this.props.currentCharacter !== characterId) this.props.setCurrentCharacter(characterId)
  }
  //listen for user input
  this.listenToUser(currentPrompt)
    .then((speech) => {
      //checks user input against possible responses.
      let result = this.grade(speech)
      //user response matched a possible response.
      if (result) {
        this.setState({
          incorrectCount: 0,
          hintText: `You said: ${result.text}`
        })
        const promptResponses = result.prompt_responses
        if (!this.state.success) {
          let success = checkQuest(promptResponses.id, this.props.currentQuest)
          this.setState({ success })
        }
        let nextPrompt = this.props.prompts.find((prompt) => {
          return prompt.id === promptResponses.nextPromptId
        })
        //start conversation with the nextPrompt
        if (nextPrompt) {
          this.props.setCurrentPrompt(nextPrompt)
          this.converse()
          //if the nextPrompt is null, then the conversation is over.
        } else {
          if (this.state.success) {
            const questReward = reward(this.props.currentQuest.id)
            this.setState({ questReward })
          }
          this.props.setCurrentPrompt({})
          this.setState({ hintText: '' })
        }
        this.setState({ vendorResponse: '' })
        //user did not respond with a possible response.
      } else {
        //after the second incorrect response, give a hint
        this.setState({ incorrectCount: this.state.incorrectCount + 1 })
        if (this.state.incorrectCount > 1) {
          this.setState({ hintText: `The vendor said: ${currentPrompt.text}` })
        }
        //Vendor says "I do not understand"
        this.setState({ vendorResponse: this.props.vendorResponse })
        this.converse()
      }
    })
}

function checkQuest(promptResponsesId, quest) {
  if (promptResponsesId === quest.promptResponsesId) {
    return true
  }
  return false
}

function listenToUser(currentPrompt) {
  return this.props.listen(speechRecObject, {
    responses: currentPrompt.responses,
    language: this.props.language
  })
}

function grade(answer) {
  return checkAnswer(answer, this.props.currentPrompt.responses)
}

function reward(questId) {
  if (questId === 1) {
    return 'apple'
  } else if (questId === 2) {
    return 'cheese'
  } else if (questId === 3) {
    return 'cat'
  } else if (questId === 4) {
    return 'fish'
  }
}
