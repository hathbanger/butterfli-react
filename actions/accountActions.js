
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS'


function fetchAccountsSuccess(accounts){
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    accounts: accounts
  }
}

// // Uses the API middlware to get a quote
export function fetchAccounts() {
  // let connection = new WebSocket('ws://localhost:1323/ws');
    console.log('fetching accts..')
return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(creds))
    return fetch('http://localhost:1323/hathbanger/accounts')
      .then(response =>
        response.json()
        .then(accounts => ({ accounts, response }))
      ).then(({ accounts, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          // dispatch(loginError(accounts.message))
          return Promise.reject(accounts)
        }
        else {
          console.log("accounts: ", accounts)
          
          // Dispatch the success action
          dispatch(fetchAccountsSuccess(accounts))
        }
      }).catch(err => console.log("Error: ", err))
  }
  
  
}

