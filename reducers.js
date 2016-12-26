import { combineReducers } from 'redux'
import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, 
} from './actions/loginAndAuthActions'

import { 
  FETCH_SUCCESS, 
} from './actions/postActions'

import { 
  FETCH_ACCOUNTS_SUCCESS, 
} from './actions/accountActions'

import { 
  FETCH_ACCOUNT_CREDS_SUCCESS, 
} from './actions/accountActions'

import { 
  GET_USER_SUCCESS, 
} from './actions/userActions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
    isFetching: false,
    user: {},
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    console.log('login request', action)
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
    console.log('login success', action)
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        username: action.username,
        errorMessage: ''
      })
    case LOGIN_FAILURE:

      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user
      })
    default:
      return state
    }
}

function postFetch(state = {
  isFetching: false,
  posts: []
}, action) {
  console.log('REDUCER TIME!', action)
  switch (action.type) {
    case  FETCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.posts
      })
    default:
      return state
    }
}

function accountFetch(state = {
  isFetching: false,
  accounts: []
}, action) {
  switch (action.type) {
    case  FETCH_ACCOUNTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        accounts: action.accounts
      })
    default:
      return state
    }
}

function accountCredsFetch(state = {
  isFetching: false,
  accountCreds: []
}, action) {
  switch (action.type) {
    case  FETCH_ACCOUNT_CREDS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        accountCreds: action.accountCreds
      })
    default:
      return state
    }
}

// We combine the reducers here so that they
// can be left split apart above
const userLogin = combineReducers({
  auth,
  postFetch,
  accountFetch,
  accountCredsFetch
})

export default userLogin