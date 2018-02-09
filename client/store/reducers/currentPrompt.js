//ACTION TYPES
const GET_PROMPT = 'GET_PROMPT'

//ACTION CREATORS
export const getPrompt = prompt => {
  return {
    type: GET_PROMPT,
    prompt
  }
}

export default function (state = null, action) {
  switch (action.type) {
    case GET_PROMPT:
      return action.prompt
    default:
      return state
  }
}
