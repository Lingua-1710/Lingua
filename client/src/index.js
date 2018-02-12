import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../store'
import { Main } from '../components'
import 'aframe-helper'
import 'aframe'
import 'babel-polyfill'
import 'aframe-environment-component'

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('main')
)
