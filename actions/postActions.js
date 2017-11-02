import update from 'immutability-helper';

export const APPROVE_REQUEST = 'APPROVE_REQUEST'
export const APPROVE_SUCCESS = 'APPROVE_SUCCESS'
export const APPROVE_FAILURE = 'APPROVE_FAILURE'

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE'


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
export function editPostTitle(posts, creds) {
  let config = {
    method: 'POST'
  }

  let text = creds.tweetText

  return dispatch => {
    dispatch(editPostRequest(posts, creds))
    return fetch('http://localhost:1323/post/edit/' + creds.postId + '/title/' + text, config)
      .then(response =>
        response.json()
        .then(post => ({post, response})))
        .then(({post, response}) => {
          if (!response.ok) {
            console.log("issues in edit!", response)
            dispatch(editPostFailure(response))
            return Promise.reject(response)
          }
          else {
            let index = posts.findIndex(x => x.id == creds.postId)
            console.log('index from postActions: ', index)
            const newPostsArray = update(posts, {[index]: {title: {$set: creds.tweetText} }})    
            dispatch(editPostSuccess(newPostsArray, creds))
          }
        })
  }
}


function editPostRequest(posts, post) {
  return {
    type: EDIT_POST_REQUEST,
    isFetching: true,
    isAuthenticated: true,
    posts: posts
  }
}

function editPostSuccess(posts, post) {
  return {
    type: EDIT_POST_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    posts: posts
  }
}

function editPostFailure(creds) {
  return {
    type: EDIT_POST_FAILURE,
    isFetching: false,
    isAuthenticated: true
  }
}
// Uses the API middlware to get a quote
export function approvePost(posts, creds) {
  let config = {
    method: 'POST'
  }
  return dispatch => {
    dispatch(approveRequest(posts, creds))
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
            let index = posts.findIndex(x => x.id==creds.id)
            const newPostsArray = update(posts, {[index]: {approved: {$set: true}}, rated: {$set: true}})    
            dispatch(approveSuccess(newPostsArray, creds))
          }
        })
  }
}


function approveRequest(posts, post) {
  return {
    type: APPROVE_REQUEST,
    isFetching: true,
    isAuthenticated: true,
    posts: posts
  }
}

function approveSuccess(posts, post) {
  return {
    type: APPROVE_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    posts: posts
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
export function disapprovePost(posts, creds) {
  let config = {
    method: 'POST'
  }
  return dispatch => {
    dispatch(disapproveRequest(posts, creds))
    console.log(creds)
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
            let index = posts.findIndex(x => x.id==creds.id)
            console.log('HERES INDEX', index)
            const newPostsArray = update(posts, {[index]: {approved: {$set: false}, rated: {$set: true}}})    
            dispatch(disapproveSuccess(newPostsArray, creds)) 
            // dispatch(fetchPosts(creds.username, creds.account))
          }
        })
  }
}


function disapproveRequest(posts, post) {
  return {
    type: DISAPPROVE_REQUEST,
    isFetching: true,
    isAuthenticated: true,
    posts: posts
  }
}

function disapproveSuccess(posts, post) {
  return {
    type: DISAPPROVE_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    posts: posts
  }
}

function disapproveFailure(posts) {
  return {
    type: DISAPPROVE_FAILURE,
    isFetching: false,
    isAuthenticated: true,
    posts: posts
  }
}


export function deletePost(posts, post) {
  let config = {
    method: 'POST'
  }
  return dispatch => {
    dispatch(deleteRequest(posts, post))
    return fetch('http://localhost:1323/'+post.username+'/accounts/'+post.account+'/post/delete/' + post.id, config)
      .then(response =>
        response.json()
        .then(postRes => ({postRes, response})))
        .then(({postRes, response}) => {
          if (!response.ok) {
            dispatch(deleteFailure(response))
            return Promise.reject(response)
          }
          else {
            let index = posts.findIndex(x => x.id==post.id)
            const newPostsArray = update(posts, {$splice: [[index, 1]]})    
            dispatch(deleteSuccess(newPostsArray, post))
          }
        })
  }
}


function deleteRequest(posts, post) {
  return {
    type: DELETE_REQUEST,
    isFetching: true,
    isAuthenticated: true,
    posts: posts
  }
}

function deleteSuccess(posts, post) {
  return {
    type: DELETE_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    posts: posts
  }
}

function deleteFailure(creds) {
  return {
    type: DELETE_FAILURE,
    isFetching: false,
    isAuthenticated: true,
    posts: posts
  }
}

