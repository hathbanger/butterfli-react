import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'

import App from './containers/App'
import Home from './components/Home'
import Search from './components/Search'
import Approved from './components/Approved'
import AccountDashSettings from './components/AccountDashSettings'
import userLogin from './reducers'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import api from './middleware/api'


const logger = createLogger()

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api, logger)(createStore)

let store = createStoreWithMiddleware(userLogin)

let rootElement = document.getElementById('app')

render(
  <Provider store={store}>
	  <Router history={browserHistory}>
	    <Route path="/" component={App}>
		    <IndexRoute component={Home} />
		    <Route path="/:userId/accounts/:account_id/search" component={Search} />
		    <Route path="/:userId/accounts/:account_id/approved" component={Approved} />
		    <Route path="/:userId/accounts/:account_id/settings" component={AccountDashSettings} />
	    </Route>
	  </Router>
  </Provider>,
  rootElement
)


	    	

