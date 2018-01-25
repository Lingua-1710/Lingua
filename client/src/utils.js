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
