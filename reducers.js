import { combineReducers } from 'redux'
import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, 
} from './actions/loginAndAuthActions'

import { 
  FETCH_SUCCESS, EDIT_POST_REQUEST, EDIT_POST_SUCCESS, APPROVE_REQUEST, APPROVE_SUCCESS, DISAPPROVE_REQUEST, DISAPPROVE_SUCCESS,
  DELETE_REQUEST, DELETE_SUCCESS 
} from './actions/postActions'

import { 
  FETCH_ACCOUNTS_SUCCESS, FETCH_ACCOUNT_CREDS_SUCCESS, 
} from './actions/accountActions'

import { 
  TWEET_REQUEST, TWEET_SUCCESS, TWEET_FAILURE, 
} from './actions/twitterActions'

import { 
  GET_USER_SUCCESS, 
} from './actions/userActions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
    isFetching: false,
    user: {},
    isAuthenticated: sessionStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
    
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
  switch (action.type) {
    case  FETCH_SUCCESS:
      return { ...state, posts: action.posts }
    case EDIT_POST_REQUEST:
      return { ...state, posts: action.posts }
    case EDIT_POST_SUCCESS:
      return { ...state, posts: action.posts }
    case APPROVE_REQUEST:
      return { ...state, posts: action.posts }
    case APPROVE_SUCCESS:
      return { ...state, posts: action.posts }
    case DISAPPROVE_REQUEST:
      return { ...state, posts: action.posts }
    case DISAPPROVE_SUCCESS:
      return { ...state, posts: action.posts }
    case DELETE_REQUEST:
      return { ...state, posts: action.posts }
    case DELETE_SUCCESS:
      return { ...state, posts: action.posts }
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