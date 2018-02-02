//ACTION TYPES
const ADD_TO_SCORE = 'ADD_TO_SCORE'

//ACTION CREATORS
export const addToScore = () => {
  return {
  type: ADD_TO_SCORE,
  }
}

export default function(state = 0, action) {
  let newState = state
  switch(action.type) {
    case ADD_TO_SCORE:
      newState+=1
      return newState
    default:
      return state
  }
}
