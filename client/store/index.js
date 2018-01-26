import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import speech from './reducers/speech';


const reducer = combineReducers({speech});
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware
  // createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './reducers/speech';
