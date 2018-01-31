import axios from 'axios'
//ACTION TYPES
const GET_PROMPTS = 'GET_PROMPTS'

//ACTION CREATORS
export const getPrompts = prompts => {
  return {
  type: GET_PROMPTS,
  prompts
  }
}

export const fetchPrompts = (fromLang, toLang) => {
  return function(dispatch) {
    axios.get('/api/prompts')
    .then(prompts => prompts.data)
    .then(prompts => Promise.all(prompts.map((prompt) => {
      return axios.get('/api/translation' + '?translate=' + fromLang + '!' + toLang + '!' + prompt.text)
      .then(text => {
        prompt.text=text.data
        return prompt
      })

    })))
    .then(prompts => dispatch(getPrompts(prompts)))
    .catch(err => console.log(err))
  }
}

export default function(state = [], action) {
  let newState = state
  switch(action.type) {
    case GET_PROMPTS:
      newState = newState.concat(action.prompts)
      return newState
    default:
      return state
  }
}
