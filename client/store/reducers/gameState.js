//ACTION TYPES
const GET_GAME_STATE = 'GET_GAME_STATE'

//ACTION CREATORS
export const getGameState = gameState => {
  return {
    type: GET_GAME_STATE,
    gameState
  }
}

export default function(state = {gameState: 'home-screen'}, action) {
  switch(action.type) {
    case GET_GAME_STATE:
      return action.gameState
    default:
      return state
  }
}
