

export const TWITTER_CREDS_REQUEST = 'TWITTER_CREDS_REQUEST'
export const TWITTER_CREDS_SUCCESS = 'TWITTER_CREDS_SUCCESS'
export const TWITTER_CREDS_FAILURE = 'TWITTER_CREDS_FAILURE'




// Uses the API middlware to get a quote
export function twitterCredsUpdate(creds) {
  let config = {
    method: 'POST'
  }
  return dispatch => {
    dispatch(twitterCredsRequest(creds))
    return fetch('http://localhost:1323/post/upload/twitter/' + creds.postId + '/' + creds.tweetText, config)
      .then(response =>
        response.json()
        .then(creds => ({creds, response})))
        .then(({creds, response}) => {
          if (!response.ok) {
            dispatch(twitterCredsFailure(response))
            return Promise.reject(response)
          }
          else {
            dispatch(twitterCredsSuccess()) 
            // dispatch(fetchPosts())
          }
        })
  }
}


function twitterCredsRequest() {
  return {
    type: TWITTER_CREDS_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function twitterCredsSuccess(creds) {
  return {
    type: TWITTER_CREDS_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

function twitterCredsFailure(creds) {
  return {
    type: TWITTER_CREDS_FAILURE,
    isFetching: false,
    isAuthenticated: true
  }
}
