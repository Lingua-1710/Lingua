import currentPrompt, { getPrompt } from './currentPrompt'

describe('currentPrompt reducer', () => {
  it('should return the initial state', () => {
    expect(currentPrompt(undefined, {})).toEqual({})
  })

  it('should handle GET_PROMPT', () => {
    expect(
      currentPrompt({}, getPrompt({prompt: 'hello'}))
    ).toEqual({
      prompt: 'hello'
    })
    expect(
      currentPrompt({ prompt: {text: 'how are you'} }, getPrompt({prompt: 'hi'}))
    ).toEqual({
      prompt: 'hi'
    })
  })
})
