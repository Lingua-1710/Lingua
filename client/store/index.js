import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import speech from './reducers/speech'
import prompts from './reducers/prompts'
import currentPrompt from './reducers/currentPrompt'
import gameState from './reducers/gameState'

const reducer = combineReducers({ speech, prompts, currentPrompt, gameState })

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

