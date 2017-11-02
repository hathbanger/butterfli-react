import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { IndexRoute, Router, Route, Link, hashHistory } from 'react-router'

import App from './containers/App'
import Home from './components/Home'
import Robot from './components/Robot'
import Search from './components/Search'
import Approved from './components/Approved'
import AccountDashSettings from './components/AccountDashSettings'
import AccountSettings from './components/AccountSettings'
import userLogin from './reducers'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import api from './middleware/api'


const logger = createLogger()

// let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api, logger)(createStore)
let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

let store = createStoreWithMiddleware(userLogin)

let rootElement = document.getElementById('app')

render(
  <Provider store={store}>
	  <Router history={hashHistory}>
	    <Route path="/" component={App}>
		    <IndexRoute component={Home} />
		    <Route path="/:userId/accounts/:account_id/search" component={Search} />
		    <Route path="/:userId/accounts/:account_id/robot" component={Robot} />
		    <Route path="/:userId/accounts/:account_id/approved" component={Approved} />
		    <Route path="/:userId/accounts/:account_id/settings" component={AccountDashSettings} />
		    <Route path="/:userId/accounts/new" component={AccountSettings} />
	    </Route>
	  </Router>
  </Provider>,
  rootElement
)


	    	

