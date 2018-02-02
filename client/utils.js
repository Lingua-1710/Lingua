import stringSimilarity from 'string-similarity'

let SpeechRecognitionEvent
let recognition
let speechRecognitionList
if (('webkitSpeechRecognition' in window) &&
    ('webkitSpeechGrammarList' in window) &&
    ('webkitSpeechRecognitionEvent' in window)) {
  recognition = new webkitSpeechRecognition()
  speechRecognitionList = new webkitSpeechGrammarList()
  SpeechRecognitionEvent = webkitSpeechRecognitionEvent
}

export const recognizeSpeech = (recObj, options) => {
  const answers = options.answers.map(ans => ans.translation).join(' | ')
  const grammar = `#JSGF V1.0 grammar answers public <answer> = ${answers} `
  speechRecognitionList.addFromString(grammar, 1)
  recognition.grammars = speechRecognitionList
  recognition.lang = options.language.langCode
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

export const checkAnswer = (userInput, answers) => {
  for(let i=0; i<answers.length; i++) {
    if((stringSimilarity.compareTwoStrings(userInput, answers[i].translation) > 0.85)) {
      if(answers[i].isCorrect) {
        return {correct: true, answer: answers[i].translation, userSpeech: userInput}
      } else {
        return {correct: false, answer: answers[i].translation, userSpeech: userInput}
      }
    }
  }
  return {correct: false, answer: null, userSpeech: userInput}
}
