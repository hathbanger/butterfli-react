

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
  console.log('starting fetchPosts')
  
return dispatch => {
    return fetch('http://localhost:1323/'+username+'/accounts/'+accountId+'/posts')
      .then(response =>
        response.json()
        .then(posts => ({ posts, response }))
      ).then(({ posts, response }) =>  {
        if (!response.ok) {
          // dispatch(loginError(posts.message))
          return Promise.reject(posts)
        }
        else {
          console.log('success fetching: ', posts)
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
    return fetch('http://localhost:1323/post/approve/' + creds.id, config)
      .then(response =>
        response.json()
        .then(post => ({post, response})))
        .then(({post, response}) => {
          if (!response.ok) {
            dispatch(approveFailure(response))
            return Promise.reject(response)
          }
          else {
            dispatch(approveSuccess())
            dispatch(fetchPosts(creds.username, creds.account))
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
    return fetch('http://localhost:1323/post/disapprove/' + creds.id, config)
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
            dispatch(fetchPosts(creds.username, creds.account))
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
export function deletePost(creds) {
  let config = {
    method: 'POST'
  }
  return dispatch => {
    dispatch(deleteRequest(creds))
    return fetch('http://localhost:1323/'+creds.user+'/accounts/'+creds.account+'/post/delete/' + creds.id, config)
      .then(response =>
        response.json()
        .then(post => ({post, response})))
        .then(({post, response}) => {
          if (!response.ok) {
            dispatch(deleteFailure(response))
            return Promise.reject(response)
          }
          else {
            dispatch(deleteSuccess()) 
            dispatch(fetchPosts(creds.username, creds.account))
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

