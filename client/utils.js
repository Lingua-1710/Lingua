import store, { sendSpeech } from './store'
import stringSimilarity from 'string-similarity'

export function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key])
  }
}

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

export const recognizeSpeech = (recognition, recList, event, ans, fromLang, toLang, langCode) => {
  console.log('f, t, lc:', fromLang, toLang, langCode)
  const grammar = '#JSGF V1.0 grammar answers public <answer> = ' + ans.join(' | ') + ' '
  recList.addFromString(grammar, 1)
  recognition.grammars = recList
  recognition.lang = langCode
  recognition.interimResults = false
  recognition.maxAlternatives = 1
  recognition.start()
  recognition.onresult = (event) => {
    let transcript = event.results["0"]["0"].transcript
    if(transcript.length) {
      store.dispatch(sendSpeech(fromLang, toLang, transcript))
    }
    recognition.stop()
  }
  recognition.onnomatch = () => {
    store.dispatch(sendSpeech(fromLang, toLang, 'What?'))
    recognition.stop()
  }
  recognition.onerror = (event) => {
    store.dispatch(sendSpeech('en', fromLang, event.error))
    recognition.stop()
  }
}

export const checkAnswer = (userInput, answer) => {
  if(stringSimilarity.compareTwoStrings(userInput, answer) > 0.85) {
    return true
  } else {
    return false
  }
}
