import { checkAnswer, speechRecObject } from './speech'

export const converse = function() {
  let currentPrompt = this.props.currentPrompt
  // check if the character was clicked for the first time OR new vendor is clicked
  currentPrompt = checkFirstClick.apply(this)
  //listen for user input
  listenToUser.apply(this, currentPrompt)
  .then((speech) => {
    //checks user input against possible responses.
    let result = checkAnswer(speech, currentPrompt.responses)
    //user response matched a possible response.
    if (result) {
      const success = checkQuest(result.prompt_responses.id, this.props.currentQuest)
      this.setState({ success })
      const nextPrompt = findNextPrompt.apply(this)
      //start conversation with the nextPrompt
      nextPrompt ? serveNextPrompt.apply(this, currentPrompt)
      //if the nextPrompt is null, then the conversation is over.
      : endConversation.apply(this)
      resetState.apply(this, result)
    //user did not respond with a possible response.
    } else {
      //after the second incorrect response, give a hint
      giveHint.apply(this, currentPrompt)
      //Vendor says "I do not understand"
      vendorResponse.apply(this)
    }
  })
}

function checkFirstClick() {
  let currentPrompt = this.props.currentPrompt
  const characterId = this.props.characterId
  if (this.props.currentCharacter !== characterId) {
    let firstPrompt = this.props.prompts.find((prompt) => {
      return prompt.id === this.props.firstPromptId
    })
    this.props.setCurrentPrompt(currentPrompt)
    this.props.setCurrentCharacter(characterId)
    return firstPrompt
  }
  return currentPrompt
}

function resetState(result) {
  this.setState({
    vendorResponse: '',
    incorrectCount: 0,
    hintText: `You said: ${result.text}`
  })
}

function findNextPrompt() {
  this.props.prompts.find((prompt) => {
    return prompt.id === this.props.promptResponses.nextPromptId
  })
}

function serveNextPrompt(nextPrompt) {
  this.props.setCurrentPrompt(nextPrompt)
  this.converse()
}

function endConversation() {
  giveReward.apply(this)
  this.props.setCurrentPrompt({})
  this.setState({hintText: ''})
}

function giveHint(currentPrompt) {
  this.setState({incorrectCount: this.state.incorrectCount + 1})
  if (this.state.incorrectCount > 1) {
    this.setState({hintText: `Incorrect: ${this.state.incorrectCount}. The vendor said: ${currentPrompt.text}`})
  }
}

function vendorResponse() {
  this.setState({vendorResponse: this.props.vendorResponse})
  this.converse()
}

function checkQuest(promptResponsesId, quest) {
  return promptResponsesId === quest.promptResponsesId
}

function listenToUser(currentPrompt) {
  return this.props.listen(speechRecObject, {
    responses: currentPrompt.responses,
    language: this.props.language
  })
}

function giveReward() {
  if (this.state.success) {
    const questReward = reward(this.props.currentQuest.id)
    this.setState({ questReward })
  }
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
