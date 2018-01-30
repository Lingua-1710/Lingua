import axios from 'axios'
//ACTION TYPES
const GET_SPEECH = 'GET_SPEECH'

//ACTION CREATORS
export const getSpeech = translate => {
  return {
  type: GET_SPEECH,
  translate
  }
}

export const sendSpeech = (fromLang, toLang, translate) => {
  return function(dispatch) {
    axios.get('/api/translation' + '?translate=' + fromLang + '!' + toLang + '!' + translate)
    .then((translation) => dispatch(getSpeech(translation)))
    .catch((err) => console.log(err))
  }
}

export default function(state = '', action) {
  let newState = state
  switch(action.type) {
    case GET_SPEECH:
      newState = action.translate
      return newState
    default:
      return state
  }
}
