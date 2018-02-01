

import store, { sendSpeech } from './store'
import stringSimilarity from 'string-similarity'

export function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key])
  }
}

export const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
export const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
export const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

export const COLORS = ['#D92B6A', '#9564F2', '#FFCF59']

export const QUESTIONS = [
  `How are you today?`,
  `What's up?`,
  `How's it going?`,
  `Hi!`,
  `Hello!`,
  `LALALA`
]

export const fetchRandomQuestion = (questions, prevQuestion) => {
  let question = questions[Math.floor(Math.random(questions) * questions.length)]
  while (question === prevQuestion) {
    question = questions[Math.floor(Math.random(questions) * questions.length)]
  }
  return question
}

export const recognizeSpeech = (recObj, options) => {
  const recognition = new SpeechRecognition()
  const speechRecognitionList = new SpeechGrammarList()
  const answers = options.answers.map(ans => ans.translation).join(' | ')
  const grammar = `#JSGF V1.0 grammar answers public <answer> = ${answers} `
  speechRecognitionList.addFromString(grammar, 1)
  recognition.grammars = speechRecognitionList
  recognition.lang = options.language.langCode
  recognition.interimResults = false
  recognition.maxAlternatives = 1
  recognition.start()
  recognition.onresult = (SpeechRecognitionEvent) => {
    let transcript = SpeechRecognitionEvent.results["0"]["0"].transcript
    if(transcript.length) {
      store.dispatch(sendSpeech(options.language.fromLang, options.language.toLang, transcript))
    }
    recognition.stop()
  }
  recognition.onnomatch = () => {
    store.dispatch(sendSpeech(options.language.fromLang, options.language.toLang, 'What?'))
    recognition.stop()
  }
  recognition.onerror = (SpeechRecognitionEvent) => {
    store.dispatch(sendSpeech(options.language.toLang, options.language.fromLang, SpeechRecognitionEvent.error))
    recognition.stop()
  }
}

export const checkAnswer = (userInput, answers) => {
  for(let i=0; i<answers.length; i++) {
    console.log('ans[i]', answers[i].text)
    if((stringSimilarity.compareTwoStrings(userInput, answers[i].text) > 0.85)) {
      if(answers[i].isCorrect) {
        return {correct: true, answer: answers[i].text}
      } else {
        return {correct: false, answer: answers[i].text}
      }
    }
  }
  return {correct: false, answer: null}
}
