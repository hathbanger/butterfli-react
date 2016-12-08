

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILURE = 'GET_USER_FAILURE'



// // Uses the API middlware to get a quote
export function getUser(creds) {
  // let connection = new WebSocket('ws://localhost:1323/ws');
  
return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(creds))
    return fetch('http://localhost:1323/user/' + creds)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          // dispatch(loginError(user.message))
          return Promise.reject(user)
        }
        else {
          // console.log("user: ", user)
          // console.log("creds: ", creds)
            
          // Dispatch the success action
          dispatch(getUserSuccess(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

function getUserRequest() {
  return {
    type: GET_USER_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function getUserSuccess(creds) {
  return {
    type: GET_USER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user: creds
  }
}

function getUserFailure() {
  return {
    type: GET_USER_FAILURE,
    isFetching: false,
    isAuthenticated: true
  }
}

