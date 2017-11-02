import { hashHistory } from 'react-router'

export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS'

export const FETCH_ACCOUNT_CREDS_SUCCESS = 'FETCH_ACCOUNT_CREDS_SUCCESS'
export const FETCH_ACCOUNT_CREDS_FAILURE = 'FETCH_ACCOUNT_CREDS_FAILURE'

function fetchAccountsSuccess(accounts){
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    accounts: accounts
  }
}

// // Uses the API middlware to get a quote
export function fetchAccounts(info) {
  return dispatch => {
    return fetch('http://localhost:1323/'+info+'/accounts')
      .then(response =>
        response.json()
        .then(accounts => ({ accounts, response }))
      ).then(({ accounts, response }) =>  {
        if (!response.ok) {
          return Promise.reject(accounts)
        }
        else {
          dispatch(fetchAccountsSuccess(accounts))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function createAccount(payload) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `title=${payload.accountTitle}`
  }  
  console.log("CONFIG", config)
  return dispatch => {
    return fetch('http://localhost:1323/'+payload.username+'/accounts/create', config)
      .then(response =>
        response.json()
        .then(accounts => ({ accounts, response }))
      ).then(({ accounts, response }) =>  {
        if (!response.ok) {
          return Promise.reject(accounts)
        }
        else {
          console.log('accounts in create', accounts)
            dispatch(fetchAccounts(payload.username))
          // dispatch(fetchAccountsSuccess(accounts))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function deleteAccount(username, accountId) {
  let config = {
    method: 'POST'
  }
  return dispatch => {
    // dispatch(deleteRequest(posts, post))
    return fetch('http://localhost:1323/'+username+'/accounts/delete/' + accountId, config)
      .then(response =>
        response.json()
        .then(postRes => ({postRes, response})))
        .then(({postRes, response}) => {
          if (!response.ok) {
            // dispatch(deleteFailure(response))
            return Promise.reject(response)
          }
          else {
            hashHistory.goBack()
          }
        })
  }
}

function fetchAccountCredsSuccess(accountCreds){
  return {
    type: FETCH_ACCOUNT_CREDS_SUCCESS,
    accountCreds: accountCreds
  }
}

function fetchAccountCredsFailure(accountCreds){
  return {
    type: FETCH_ACCOUNT_CREDS_FAILURE,
    accountCreds: accountCreds
  }
}

export function fetchCredsAccount(creds) {
return dispatch => {
    return fetch('http://localhost:1323/'+creds.user.name+'/accounts/' + creds.accountId + '/account-creds')
      .then(response =>
        response.json()
        .then(accountCreds => ({ accountCreds, response }))
      ).then(({ accountCreds, response }) =>  {
        if (accountCreds == null) {
          console.log('this didnt work')
          dispatch(fetchAccountCredsFailure(accountCreds))
          return Promise.reject(accountCreds)
        }
        else {
          // Dispatch the success action
          console.log("accountCreds", accountCreds)
          dispatch(fetchAccountCredsSuccess(accountCreds))
        }
      }).catch(err => console.log("Error: ", err))
  }
  
  
}

