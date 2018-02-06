import stringSimilarity from 'string-similarity'

/* global webkitSpeechRecognition webkitSpeechGrammarList webkitSpeechRecognitionEvent */

/* Speech Utils */
let SpeechRecognition
let SpeechGrammarList
let SpeechRecognitionEvent
try {
  SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
} catch(e) {
  /* Testing causes an error with webkit, so this is a workaround */
  console.log(e.message)
}

export const speechRecObject = {
  SpeechRecognition,
  SpeechGrammarList,
  SpeechRecognitionEvent
}

export const recognizeSpeech = (recObj, options) => {
  const recognition = new SpeechRecognition()
  const speechRecognitionList = new SpeechGrammarList()
  const responses = options.responses.map(ans => ans.translation).join(' | ')
  const grammar = `#JSGF V1.0 grammar answers public <answer> = ${responses} `
  speechRecognitionList.addFromString(grammar, 1)
  recognition.grammars = speechRecognitionList
  recognition.lang = options.language.learningLangCode
  recognition.interimResults = false
  recognition.maxAlternatives = 1
  return new Promise((resolve, reject) => {
    recognition.start()
    recognition.onresult = (SpeechRecognitionEvent) => {
      recognition.stop()
      resolve(SpeechRecognitionEvent.results["0"]["0"].transcript)
    }
    recognition.onnomatch = () => {
      recognition.stop()
      reject(new Error('What? I did not understand'))
    }
    recognition.onerror = (SpeechRecognitionEvent) => {
      recognition.stop()
      reject(SpeechRecognitionEvent.error)
    }
  })
}

export const checkAnswer = (userInput, responses) => {
  for(let i=0; i<responses.length; i++) {
    if((stringSimilarity.compareTwoStrings(userInput, responses[i].translation) > 0.85)) {
      return responses[i]
    }
  }
  return null
}

/* Conversation Utils */
export const converse = function() {
  this.listenToUser = listenToUser.bind(this)
  this.grade = grade.bind(this)
  let currentPrompt = this.props.currentPrompt
  // check if the character was clicked for the first time.
  if(!Object.keys(currentPrompt).length) {
    let firstPrompt = this.props.prompts.find((prompt) => {
      return prompt.id === this.props.firstPromptId
    })
    currentPrompt = firstPrompt
    this.props.setCurrentPrompt(currentPrompt)
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
      let nextPrompt = this.props.prompts.find((prompt) => {
        return prompt.id === result.prompt_responses.nextPromptId
      })
      //start conversation with the nextPrompt
      if(nextPrompt) {
        this.props.setCurrentPrompt(nextPrompt)
        this.converse()
      //if the nextPrompt is null, then the conversation is over.
      } else {
        reward()
        this.props.setCurrentPrompt({})
        this.setState({hintText: ''})
      }
      this.setState({vendorResponse: ''})
    //user did not respond wiht a possible response.
    } else {
      //after the second incorrect response, give a hint
      this.setState({incorrectCount: this.state.incorrectCount + 1})
      if(this.state.incorrectCount > 1) {
        this.setState({hintText: `The vendor said: ${currentPrompt.text}`})
      }
      //Vendor says "I do not understand"
      this.setState({vendorResponse: this.props.vendorResponse})
      this.converse()
    }
  })
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

function reward() {
  //temporary log until we have the rest of the logic for this down
  console.log('good job duderino, you did the thing!')
}
