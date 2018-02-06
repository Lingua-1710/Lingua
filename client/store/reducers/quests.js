import axios from 'axios'

//ACTION TYPES
const GET_QUESTS = 'GET_QUESTS'

//ACTION CREATORS
export const getQuests = quests => {
  return {
    type: GET_QUESTS,
    quests
  }
}

export const fetchQuests = () => {
  return dispatch => axios.get('/api/quests')
  .then(quests => dispatch(getQuests(quests.data)))
  .catch(err => console.log(err))
}

export default function(state = [], action) {
  switch(action.type) {
    case GET_QUESTS:
      return action.quests
    default:
      return state
  }
}
