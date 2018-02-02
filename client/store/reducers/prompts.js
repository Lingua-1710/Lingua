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
    .then(prompts => translatePrompts(prompts, fromLang, toLang))
    .then(prompts => dispatch(getPrompts(prompts)))
    .catch(err => console.log(err))
  }
}

const translatePrompts = (prompts, fromLang, toLang) => {
  return Promise.all(prompts.map((prompt) => {
    return axios.get('/api/translation' + '?translate=' + fromLang + '!' + toLang + '!' + prompt.text)
    .then(async (translation) => {
      prompt.translation = translation.data
      prompt.responses = await translateResponses(prompt.responses, fromLang, toLang)
      return prompt;
    })
  }))
}

const translateResponses = (responses, fromLang, toLang) => {
  return Promise.all(responses.map((response) => {
    return axios.get('/api/translation' + '?translate=' + fromLang + '!' + toLang + '!' + response.text)
    .then((translation) => {
      response.translation = translation.data
      return response;
    })
  }))
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
