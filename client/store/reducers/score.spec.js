import score, { addToScore } from './score'

describe('score reducer', () => {
  it('should return the initial state', () => {
    expect(score(undefined, {})).toEqual(0)
  })

  it('should handle ADD_TO_SCORE', () => {
    expect(
      score(0, addToScore(1))
    ).toEqual(1)
    expect(
      score(3, addToScore(1))
    ).toEqual(4)
  })
})
