import { checkAnswer, speechRecObject } from './speech'

export const converse = function() {
  let { characterId, currentPrompt, currentCharacter, currentQuest } = this.props
  const newCharacter = currentCharacter !== characterId
  // check if the character was clicked for the first time OR new vendor is clicked
  const firstClick = checkFirstClick.call(this, newCharacter, currentPrompt)
  if (firstClick) currentPrompt = getFirstPrompt.call(this, currentPrompt, characterId)
  //listen for user input
  listenToUser.call(this, currentPrompt)
  .then((speech) => {
    //checks user input against possible responses.
    let result = checkAnswer(speech, currentPrompt.responses)
    //user response matched a possible response.
    if (result) {
      const success = checkQuest(result.prompt_responses.id, currentQuest)
      this.setState({ success })
      const nextPrompt = findNextPrompt.call(this, result.prompt_responses.nextPromptId)
      //start conversation with the nextPrompt
      if (nextPrompt) serveNextPrompt.call(this, nextPrompt)
      //if the nextPrompt is null, then the conversation is over.
      else {
        endConversation.call(this)
        resetState.call(this, result)
      }
      resetState.call(this)
    //user did not respond with a possible response.
    } else {
      //after the second incorrect response, give a hint
      giveHint.call(this, currentPrompt)
      //For current character, Vendor says "I do not understand"
      vendorResponse.call(this, 'I do not understand')
      this.converse()
    }
  })
}

function checkFirstClick(newCharacter, currentPrompt) {
  if (newCharacter) resetState.call(this)
  return newCharacter || !currentPrompt
}

function getFirstPrompt(currentPrompt, characterId) {
  let firstPrompt = this.props.prompts.find((prompt) => {
    return prompt.id === this.props.firstPromptId
  })
  this.props.setCurrentPrompt(firstPrompt)
  this.props.setCurrentCharacter(characterId)
  return firstPrompt
}

function resetState(result) {
  const hintText = result !== undefined ? `You said: ${result.text}` : ''
  vendorResponse.call(this, '')
  this.setState({
    incorrectCount: 0,
    hintText
  })
}

function findNextPrompt(nextPromptId) {
  return this.props.prompts.find((prompt) => {
    return prompt.id === nextPromptId
  })
}

function serveNextPrompt(nextPrompt) {
  this.props.setCurrentPrompt(nextPrompt)
  this.converse()
}

function endConversation() {
  giveReward.call(this)
  this.props.setCurrentPrompt(null)
  this.setState({hintText: ''})
}

function giveHint(currentPrompt) {
  this.setState({incorrectCount: this.state.incorrectCount + 1})
  if (this.state.incorrectCount > 1) {
    this.setState({hintText: `Incorrect: ${this.state.incorrectCount}. The vendor said: ${currentPrompt.text}`})
  }
}

function vendorResponse(response) {
  const { getVendorResponse, currentLanguage } = this.props
  const nativeLang = currentLanguage.nativeLang
  const learningLang = currentLanguage.learningLang
  getVendorResponse(response, nativeLang, learningLang)
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
