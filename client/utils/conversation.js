import { checkAnswer, speechRecObject } from './speech'

export const converse = function() {
  this.setState({ listening: 'Listening!' })
  let { characterId, currentPrompt, currentCharacter, currentQuest } = this.props
  const newCharacter = currentCharacter !== characterId
  // check if the character was clicked for the first time OR new vendor is clicked
  const firstClick = checkFirstClick.call(this, newCharacter, currentPrompt)
  if (firstClick) currentPrompt = getFirstPrompt.call(this, currentPrompt, characterId)
  //listen for user input
  listenToUser.call(this, currentPrompt)
  .then((speech) => {
    //checks user input against possible responses.
    let result = checkAnswer(speech, currentPrompt.responses, this.state.speechAccuracyThreshold)
    //user response matched a possible response.
    if (result) {
      //checks for completed quest, fetches next prompt, or resets state if the conversation is over.
      handleCorrect.call(this, result, currentQuest)
    //user did not respond with a possible response.
    } else {
      //after the second incorrect response, give a hint
      giveHint.call(this, currentPrompt)
      //For current character, Vendor says "I do not understand"
      vendorResponse.call(this, 'I do not understand')
      this.converse()
    }
  })
  .catch(err => {
    //remove listening text when no speech was detected and timed out
    if (err === 'listening-ended' || err === 'no-speech') this.setState({ listening: '' })
    console.error(err)
  })
}

function handleCorrect(result, currentQuest) {
  const success = checkQuest(result.prompt_responses.id, currentQuest)
  if (success) this.setState({ success })
  let nextPrompt = findNextPrompt.call(this, result.prompt_responses.nextPromptId) || null
  //start conversation with the nextPrompt
  if (nextPrompt) {
    resetState.call(this, 'Listening!', result.text)
  //if the nextPrompt is null, then the conversation is over.
  } else {
    giveReward.call(this)
    resetState.call(this, '')
  }
  this.props.setCurrentPrompt(nextPrompt)
  if (nextPrompt) this.converse()
}

function checkFirstClick(newCharacter, currentPrompt) {
  if (newCharacter) resetState.call(this, 'Listening!')
  return newCharacter || !Object.keys(currentPrompt).length
}

function getFirstPrompt(currentPrompt, characterId) {
  let firstPrompt = this.props.prompts.find((prompt) => {
    return prompt.id === this.props.firstPromptId
  })
  this.props.setCurrentPrompt(firstPrompt)
  this.props.setCurrentCharacter(characterId)
  return firstPrompt
}

function resetState(listening, hintText) {
  hintText = hintText ? `You said: ${hintText}` : ''
  vendorResponse.call(this, '')
  this.setState({
    incorrectCount: 0,
    hintText,
    speechAccuracyThreshold: 0.85,
    listening
  })
}

function findNextPrompt(nextPromptId) {
  const newPrompt = this.props.prompts.find((prompt) => {
    return prompt.id === nextPromptId
  })
  return newPrompt
}

function giveHint(currentPrompt) {
  this.setState({incorrectCount: this.state.incorrectCount + 1})
  //make it easier after 5 incorrect
  if (this.state.incorrectCount > 5) {
    this.setState({speechAccuracyThreshold: 0.5})
  }
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
    return 'donut'
  } else if (questId === 5) {
    //it's a joke
    return 'fish'
  }
}
