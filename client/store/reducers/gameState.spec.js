import gameState, { getGameState } from './gameState'

describe('gameState reducer', () => {
  it('should return the initial state', () => {
    expect(gameState(undefined, {})).toEqual({gameState: 'home-screen'})
  })

  it('should handle GET_GAME_STATE', () => {
    expect(
      gameState({}, getGameState({gameState: 'loading'}))
    ).toEqual({
      gameState: 'loading'
    })
    expect(
      gameState({ gameState: {gameState: 'home-screen'} }, getGameState({gameState: 'loading'}))
    ).toEqual({
      gameState: 'loading'
    })
  })
})
