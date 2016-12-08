

export const APPROVE_REQUEST = 'APPROVE_REQUEST'
export const APPROVE_SUCCESS = 'APPROVE_SUCCESS'
export const APPROVE_FAILURE = 'APPROVE_FAILURE'


export const FETCH_SUCCESS = 'FETCH_SUCCESS'


export const DISAPPROVE_REQUEST = 'DISAPPROVE_REQUEST'
export const DISAPPROVE_SUCCESS = 'DISAPPROVE_SUCCESS'
export const DISAPPROVE_FAILURE = 'DISAPPROVE_FAILURE'


export const DELETE_REQUEST = 'DELETE_REQUEST'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'
export const DELETE_FAILURE = 'DELETE_FAILURE'


function fetchPostsSuccess(posts){
  console.log('fetch post success!', posts)
  return {
    type: FETCH_SUCCESS,
    posts: posts
  }
}

// // Uses the API middlware to get a quote
export function fetchPosts(username, accountId) {
  // let connection = new WebSocket('ws://localhost:1323/ws');
  
return dispatch => {
    console.log('fetching posts: username ->', username)
    console.log('fetching posts: accountId ->', accountId)
    return fetch('http://localhost:1323/'+username+'/accounts/'+accountId+'/posts')
      .then(response =>
        response.json()
        .then(posts => ({ posts, response }))
      ).then(({ posts, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          // dispatch(loginError(posts.message))
          return Promise.reject(posts)
        }
        else {
          console.log("posts: ", posts)
          
          // Dispatch the success action
          dispatch(fetchPostsSuccess(posts))
        }
      }).catch(err => console.log("Error: ", err))
  }
  
  
}

// Uses the API middlware to get a quote
export function approvePost(creds) {
  let config = {
    method: 'POST'
  }
  return dispatch => {
    dispatch(approveRequest(creds))
    console.log('http://localhost:1323/post/approve/' + creds, config)
    return fetch('http://localhost:1323/post/approve/' + creds, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            dispatch(approveFailure(response))
            return Promise.reject(response)
          }
          else {
            dispatch(approveSuccess()) 
            // dispatch(fetchPosts())
          }
        })
  }
}


function approveRequest() {
  return {
    type: APPROVE_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function approveSuccess(creds) {
  return {
    type: APPROVE_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

function approveFailure(creds) {
  return {
    type: APPROVE_FAILURE,
    isFetching: false,
    isAuthenticated: true
  }
}


// Uses the API middlware to get a quote
export function disapprovePost(creds) {
  let config = {
    method: 'POST'
  }
  return dispatch => {
    dispatch(disapproveRequest(creds))
    console.log('http://localhost:1323/post/disapprove/' + creds, config)
    return fetch('http://localhost:1323/post/disapprove/' + creds, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            dispatch(disapproveFailure(response))
            return Promise.reject(response)
          }
          else {
            dispatch(disapproveSuccess()) 
            // dispatch(fetchPosts())
          }
        })
  }
}


function disapproveRequest() {
  return {
    type: DISAPPROVE_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function disapproveSuccess(creds) {
  return {
    type: DISAPPROVE_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

function disapproveFailure(creds) {
  return {
    type: DISAPPROVE_FAILURE,
    isFetching: false,
    isAuthenticated: true
  }
}


// Uses the API middlware to get a quote
export function deletePost(creds, posts) {
  let config = {
    method: 'POST'
  }
  return dispatch => {
    dispatch(deleteRequest(creds))
    console.log('http://localhost:1323/post/delete/' + creds, config)
    return fetch('http://localhost:1323/'+creds.user+'/accounts/'+creds.account+'/post/delete/' + creds.post_id, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            dispatch(deleteFailure(response))
            return Promise.reject(response)
          }
          else {
            dispatch(deleteSuccess(posts)) 
            // dispatch(fetchPosts())
          }
        })
  }
}


function deleteRequest() {
  return {
    type: DELETE_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function deleteSuccess(creds) {
  return {
    type: DELETE_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

function deleteFailure(creds) {
  return {
    type: DELETE_FAILURE,
    isFetching: false,
    isAuthenticated: true
  }
}

