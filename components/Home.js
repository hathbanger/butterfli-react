import React, { Component, PropTypes } from 'react'
import SignUpContainer from '../containers/SignUpContainer'

import Dashboard from './Dashboard'

// import { fetchPosts } from '../actions'

export default class Home extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage, user, accounts, posts } = this.props
    return (
      <div>
            {!isAuthenticated &&
              <div>
                <SignUpContainer dispatch={dispatch} />
              </div>          
            }
            {isAuthenticated &&
              <div>
                <Dashboard user={user} accounts={accounts} dispatch={dispatch} />
              </div>
            } 
          </div>
    )
  }

}

Home.propTypes = {
  accounts: PropTypes.array,
  posts: PropTypes.array,
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string
}