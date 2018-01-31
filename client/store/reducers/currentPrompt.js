//ACTION TYPES
const GET_PROMPT = 'GET_PROMPT'

//ACTION CREATORS
export const getPrompt = prompt => {
  return {
    type: GET_PROMPT,
    prompt
  }
}


export default function (state = {}, action) {
  console.log('action', action)
  let newState
  switch (action.type) {
    case GET_PROMPT:
      newState = Object.assign({}, action.prompt)
      console.log('new state', newState)
      return newState
    default:
      return state
  }
}
