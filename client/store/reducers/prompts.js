import axios from 'axios'

//ACTION TYPES
const GET_PROMPTS = 'GET_PROMPTS'

//ACTION CREATORS
export const getPrompts = (characterId, prompts) => {
  return {
    type: GET_PROMPTS,
    characterId,
    prompts
  }
}

export const fetchPrompts = (fromLang, toLang, characterId) => {
  return function(dispatch) {
    return axios.get(`/api/prompts?characterId=${characterId}`)
    .then(prompts => prompts.data)
    .then(prompts => translatePrompts(prompts, fromLang, toLang))
    .then(prompts => dispatch(getPrompts(prompts)))
    .catch(err => console.log(err))
  }
}

export const translatePrompts = (prompts, fromLang, toLang) => {
  return Promise.all(prompts.map((prompt) => {
    return axios.get('/api/translation' + '?translate=' + fromLang + '!' + toLang + '!' + prompt.text)
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
    return axios.get('/api/translation' + '?translate=' + fromLang + '!' + toLang + '!' + response.text)
    .then((translation) => {
      response.translation = translation.data
      return response
    })
    .catch(err => console.log(err))
  }))
}

export default function(state = {}, action) {
  switch(action.type) {
    case GET_PROMPTS:
      return {...state, action.characterId: action.prompts}
    default:
      return state
  }
}
