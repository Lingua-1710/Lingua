import axios from 'axios'

//ACTION TYPES
const GET_SPEECH = 'GET_SPEECH'

//ACTION CREATORS
export const getSpeech = speech => {
  return {
    type: GET_SPEECH,
    speech
  }
}

export const sendSpeech = (lang, speech) => {
  return function(dispatch) {
    axios.get('/api/translation' + '?speech=' + lang + '!' + speech)
    .then((translation) => dispatch(getSpeech(translation)))
    .catch((err) => console.log(err))
  }
}

export default function(state = '', action) {
  let newState = state
  switch(action.type) {
    case GET_SPEECH:
      newState = action.speech
      return newState
    default:
      return state
  }
}
