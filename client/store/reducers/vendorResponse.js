import axios from 'axios'
//ACTION TYPES
const RESPOND = 'RESPOND'

//ACTION CREATORS
export const respond = response => {
  return {
    type: RESPOND,
    response
  }
}

export const translateResponse = (response, fromLang, toLang) => {
  return function(dispatch) {
    axios.get('/api/translation' + '?translate=' + fromLang + '!' + toLang + '!' + response)
    .then((translation) => {
      let response = translation.data
      dispatch(respond(response))
    })
    .catch(err => console.log(err))
  }
}

export default function(state = '', action) {
  switch(action.type) {
    case RESPOND:
      return action.response
    default:
      return state
  }
}
