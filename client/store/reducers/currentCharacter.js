//ACTION TYPES
const SET_CHARACTER = 'SET_CHARACTER'

//ACTION CREATORS
export const setCharacter = character => {
  return {
    type: SET_CHARACTER,
    character
  }
}

//REDUCER
export default function(state = 0, action) {
  switch(action.type) {
    case SET_CHARACTER:
      return action.character
    default:
      return state
  }
}
