/*
整个项目的入口，从index.js开始
*/
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import App from './App.js'

ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('root'))