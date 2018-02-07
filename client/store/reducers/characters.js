import axios from 'axios'

//ACTION TYPES
const GET_CHARACTERS = 'GET_CHARACTERS'

//ACTION CREATORS
export const getCharacters = characters => {
  return {
    type: GET_CHARACTERS,
    characters
  }
}

export const fetchCharacters = () => {
  return dispatch => axios.get('/api/characters')
  .then(characters => dispatch(getCharacters(characters.data)))
  .catch(err => console.log(err))
}

export default function(state = [], action) {
  switch(action.type) {
    case GET_CHARACTERS:
      return action.characters
    default:
      return state
  }
}
