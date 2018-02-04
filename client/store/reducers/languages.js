import axios from 'axios'

//ACTION TYPES
const GET_LANGUAGES = 'GET_LANGUAGES'

//ACTION CREATORS
export const getLanguages = languages => {
  return {
    type: GET_LANGUAGES,
    languages
  }
}

//THUNK CREATOR

export const fetchLanguages = () => {
  return function(dispatch) {
    return axios.get('/api/languages')
    .then(languages => languages.data)
    .then(languages => dispatch(getLanguages(languages)))
    .catch(err => console.log(err))
  }
}

//REDUCER
export default function(state = [], action) {
  switch(action.type) {
    case GET_LANGUAGES:
      let newState = state
      newState = newState.concat(action.languages)
      return newState
    default:
      return state
  }
}
