import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import speech from './reducers/speech'
import prompts from './reducers/prompts'
import currentPrompt from './reducers/currentPrompt'
import gameState from './reducers/gameState'
import score from './reducers/score'

const reducer = combineReducers({ speech, prompts, currentPrompt, gameState, score })

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './reducers/speech'
export * from './reducers/prompts'
export * from './reducers/currentPrompt'
export * from './reducers/gameState'
export * from './reducers/score'

