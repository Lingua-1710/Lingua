import currentPrompt, { getPrompt } from './currentPrompt'

describe('currentPrompt reducer', () => {
  it('should return the initial state', () => {
    expect(currentPrompt(undefined, {})).toEqual({})
  })

  it('should handle GET_PROMPT', () => {
    expect(
      currentPrompt({}, getPrompt({text: 'hello'}))
    ).toEqual({
      text: 'hello'
    })
    expect(
      currentPrompt({ prompt: {text: 'how are you'} }, getPrompt({text: 'hi'}))
    ).toEqual({
      text: 'hi'
    })
  })
})
