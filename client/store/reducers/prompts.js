import axios from 'axios'
import { deAccent } from '../../utils/accentRemover'
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
    return axios.get('/api/prompts')
    .then(prompts => prompts.data)
    .then(prompts => translatePrompts(prompts, fromLang, toLang))
    .then(prompts => dispatch(getPrompts(prompts)))
    .catch(err => console.log(err))
  }
}

export const translatePrompts = (prompts, fromLang, toLang) => {
  return Promise.all(prompts.map((prompt) => {
    return axios.get('/api/translation', {params: {fromLang, toLang, text: prompt.text}})
    .then(async (translation) => {
      prompt.translation = translation.data
      prompt.responses = await translateResponses(prompt.responses, fromLang, toLang)
      return prompt
    })
    .catch(err => console.log(err))
  }))
}

export const translateResponses = (responses, fromLang, toLang) => {
  return Promise.all(responses.map((response) => {
    return axios.get('/api/translation', {params: {fromLang, toLang, text: response.text}})
    .then((translation) => {
      response.translation = translation.data
      return response
    })
    .catch(err => console.log(err))
  }))
}

export default function(state = [], action) {
  switch(action.type) {
    case GET_PROMPTS:
      return action.prompts
    default:
      return state
  }
}
