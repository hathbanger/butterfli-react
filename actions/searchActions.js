import {fetchPosts} from './postActions'

export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'



// Uses the API middlware to get a quote
export function search(username, accountId, text) {
  let config = {
    method: 'GET'
  }
  console.log('favortiing..')
  return dispatch => {
    // dispatch(deleteRequest(creds))
    return fetch('http://localhost:1323/'+username+'/accounts/'+accountId+'/search/twitter/' + text, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            dispatch(searchFailure(response))
            return Promise.reject(response)
          }
          else {
            dispatch(searchSuccess()) 
            dispatch(fetchPosts(username, accountId))
          }
        })
  }
}


function searchRequest() {
  return {
    type: SEARCH_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function searchSuccess(creds) {
  return {
    type: SEARCH_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

function searchFailure(creds) {
  return {
    type: SEARCH_FAILURE,
    isFetching: false,
    isAuthenticated: true
  }
}




