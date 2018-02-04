import prompts, { getPrompts, fetchPrompts, translatePrompts, translateResponses } from './prompts'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('prompts reducer', () => {
  it('should return the initial state', () => {
    expect(prompts(undefined, {})).toEqual([])
  })

  it('should handle GET_PROMPTS', () => {
    expect(
      prompts([], getPrompts([{text: 'hello'}]))
    ).toEqual(
      [{text: 'hello'}]
    )
    expect(
      prompts([{text: 'how are you'}], getPrompts([{text: 'hi'}]))
    ).toEqual(
      [{text: 'how are you'}, {text: 'hi'}]
    )
  })
})

describe('thunk creators', () => {
  let store
  let mockAxios
  const initialState = []
  const fromLang = 'en'
  const toLang = 'es'
  const fakePrompts = [{text: 'Hello, how are you?', responses: [{text: 'I\'m fine, thanks'}]}]
  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('translateResponses', () => {
    it('translates the prompt responses: ', () => {
      const expectedResponses = [{text: 'I\'m fine, thanks', translation: 'Estoy bien, gracias'}]
      mockAxios.onGet('/api/translation' + '?translate=' + fromLang + '!' + toLang + '!' + fakePrompts[0].responses[0].text).replyOnce(200, 'Estoy bien, gracias')
      return translateResponses(fakePrompts[0].responses, fromLang, toLang)
        .then(prompts => {
          expect(prompts).toEqual(expectedResponses)
        })
    })
  })

  describe('translatePrompts', () => {
    it('translates the prompt texts: ', () => {
      const expectedPrompts = [{text: 'Hello, how are you?', translation: 'Hola como estas', responses: [{text: 'I\'m fine, thanks', translation: 'Estoy bien, gracias'}]}]
      mockAxios.onGet('/api/translation' + '?translate=' + fromLang + '!' + toLang + '!' + fakePrompts[0].text).replyOnce(200, 'Hola como estas')
      mockAxios.onGet('/api/translation' + '?translate=' + fromLang + '!' + toLang + '!' + fakePrompts[0].responses[0].text).replyOnce(200, 'Estoy bien, gracias')
      return translatePrompts(fakePrompts, fromLang, toLang)
        .then(prompts => {
          expect(prompts).toEqual(expectedPrompts)
        })
    })
  })

  describe('fetchPrompts', () => {
    it('eventually dispatches the GET_PROMPTS action', () => {
      const expectedPrompts = [{text: 'Hello, how are you?', translation: 'Hola como estas', responses: [{text: 'I\'m fine, thanks', translation: 'Estoy bien, gracias', isCorrect: true, promptId: 1}]}]
      mockAxios.onGet('/api/prompts').replyOnce(200, [{text: 'Hello, how are you?', translation: 'Hola como estas', responses: [{text: 'I\'m fine, thanks', translation: 'Estoy bien, gracias', isCorrect: true, promptId: 1}]}])
      mockAxios.onGet('/api/translation' + '?translate=' + fromLang + '!' + toLang + '!' + fakePrompts[0].text).replyOnce(200, 'Hola como estas')
      mockAxios.onGet('/api/translation' + '?translate=' + fromLang + '!' + toLang + '!' + fakePrompts[0].responses[0].text).replyOnce(200, 'Estoy bien, gracias')
      return store.dispatch(fetchPrompts(fromLang, toLang))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).toEqual('GET_PROMPTS')
          expect(actions[0].prompts).toEqual(expectedPrompts)
        })
    })
  })
})
