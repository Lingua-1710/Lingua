import store, { sendSpeech } from './store'

export function setAttributes(el, attrs) {
  for(var key in attrs) {
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

export const recognizeSpeech = (recognition, recList, event, ans, googLang, langCode) => {
  const grammar = '#JSGF V1.0; grammar answers; public <answer> = ' + ans.join(' | ') + ' ;'
  recList.addFromString(grammar, 1)
  recognition.grammars = recList
  recognition.lang = langCode
  recognition.interimResults = false
  recognition.maxAlternatives = 1
  recognition.start()
  const result = recognition.onresult = (event) => {
    let transcript = event.results["0"]["0"].transcript
    store.dispatch(sendSpeech(googLang, transcript))
  };
  const noMatch = recognition.onnomatch = (event) => {
    store.dispatch(sendSpeech(googLang, 'What?'))
  };
  const recognitionError = recognition.onerror = (event) => {
    store.dispatch(sendSpeech('en-US', event.error))
  };
};
