import prompts, { getPrompts } from './prompts'

describe('prompts reducer', () => {
  it('should return the initial state', () => {
    expect(prompts(undefined, {})).toEqual([])
  })

  it('should handle GET_PROMPTS', () => {
    expect(
      prompts([], getPrompts(['hello']))
    ).toEqual(
      ['hello']
    )
    expect(
      prompts(['how are you'], getPrompts(['hi']))
    ).toEqual(
      ['how are you', 'hi']
    )
  })
})
