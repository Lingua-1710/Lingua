//ACTION TYPES
const SET_QUEST = 'SET_QUEST'

//ACTION CREATORS
export const setQuest = quest => {
  return {
    type: SET_QUEST,
    quest
  }
}

//REDUCER
export default function(state = {}, action) {
  switch(action.type) {
    case SET_QUEST:
      return action.quest
    default:
      return state
  }
}
