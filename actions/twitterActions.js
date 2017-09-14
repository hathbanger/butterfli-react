

export const TWEET_REQUEST = 'TWEET_REQUEST'
export const TWEET_SUCCESS = 'TWEET_SUCCESS'
export const TWEET_FAILURE = 'TWEET_FAILURE'

export const TWEET_FAVORITE_STATUS = 'TWEET_FAILURE'

// Uses the API middlware to get a quote
export function favorite(username, accountId, text) {
  let config = {
    method: 'POST'
  }
  console.log('favortiing..')
  return dispatch => {
    // dispatch(deleteRequest(creds))
    return fetch('http://localhost:1323/'+username+'/accounts/'+accountId+'/favorite/twitter/' + text, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            dispatch(favoriteFailure(response))
            return Promise.reject(response)
          }
          else {
            console.log("FAVE SUCCES")
            dispatch(favoriteSuccess()) 
            // dispatch(fetchPosts(username, accountId))
          }
        })
  }
}


function favoriteRequest() {
  return {
    type: FAVORITE_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function favoriteSuccess(creds) {
  return {
    type: FAVORITE_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

function favoriteFailure(creds) {
  return {
    type: FAVORITE_FAILURE,
    isFetching: false,
    isAuthenticated: true
  }
}

// Uses the API middlware to get a quote
export function tweetPost(creds) {
  let config = {
    method: 'POST'
  }
  console.log('creeds', creds)
  return dispatch => {
    dispatch(tweetRequest(creds))
    return fetch('http://localhost:1323/' 
                    + creds.username 
                    + '/accounts/' 
                    + creds.accountId 
                    + '/post/' 
                    + creds.postId 
                    + '/upload/twitter/' 
                    + creds.tweetText, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            dispatch(tweetFailure(response))
            return Promise.reject(response)
          }
          else {
            dispatch(tweetSuccess()) 
          }
        })
  }
}


function tweetRequest() {
  return {
    type: TWEET_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function tweetSuccess(creds) {
  return {
    type: TWEET_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

function tweetFailure(creds) {
  return {
    type: TWEET_FAILURE,
    isFetching: false,
    isAuthenticated: true
  }
}