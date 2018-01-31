import axios from 'axios'
//ACTION TYPES
const GET_PROMPT = 'GET_PROMPT'

//ACTION CREATORS
export const getPrompt = prompt => {
  return {
  type: GET_PROMPT,
  prompt
  }
}

export default function(state = '', action) {
  let newState = state
  switch(action.type) {
    case GET_PROMPT:
      newState = action.prompt
      return newState
    default:
      return state
  }
}
