

export const TWITTER_CREDS_REQUEST = 'TWITTER_CREDS_REQUEST'
export const TWITTER_CREDS_SUCCESS = 'TWITTER_CREDS_SUCCESS'
export const TWITTER_CREDS_FAILURE = 'TWITTER_CREDS_FAILURE'




// Uses the API middlware to get a quote
export function twitterCredsUpdate(creds) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `consumerKey=${creds.consumerKey}&consumerSecret=${creds.consumerSecret}&accessToken=${creds.accessToken}&accessTokenSecret=${creds.accessTokenSecret}`
  }

  return dispatch => {
    console.log("TWITTER CREDS UPDATE", config)
    dispatch(twitterCredsRequest(creds))
    return fetch('http://localhost:1323/hath/accounts/' 
                  + creds.accountId 
                  + '/account-creds', config)
      .then(response =>
        response.json()
        .then(creds => ({creds, response})))
        .then(({creds, response}) => {
          if (!response.ok) {
            console.log('bad response', creds)
            dispatch(twitterCredsFailure(response))
            return Promise.reject(response)
          }
          else {
            console.log('ok response', creds)
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
