import gameState, { getGameState } from './gameState'

describe('gameState reducer', () => {

  it('should return the initial state', () => {
    expect(gameState(undefined, {})).toEqual('home-screen')
  })

  it('should handle GET_GAME_STATE', () => {
    expect(
      gameState({}, getGameState('loading'))
    ).toEqual(
      'loading'
    )
    expect(
      gameState('home-screen', getGameState('loading'))
    ).toEqual(
      'loading'
    )
  })
})
