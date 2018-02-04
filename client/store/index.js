import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import prompts from './reducers/prompts'
import currentPrompt from './reducers/currentPrompt'
import gameState from './reducers/gameState'
import vendorResponse from './reducers/vendorResponse'

const reducer = combineReducers({
  prompts,
  currentPrompt,
  gameState,
  vendorResponse
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './reducers/prompts'
export * from './reducers/currentPrompt'
export * from './reducers/gameState'
export * from './reducers/vendorResponse'

