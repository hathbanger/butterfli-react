import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/postActions'
import { loginUser } from '../actions/loginAndAuthActions'
import Login from '../components/Login'
import Home from '../components/Home'
import Navbar from '../components/Navbar'

class App extends Component {
  
  render() {
    const { dispatch,  isAuthenticated, errorMessage, accounts, user, posts } = this.props
    
    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />
        <div className="container">
          <div className="jumbotron">
            {this.props.children && React.cloneElement(this.props.children, {
              dispatch: this.props.dispatch, 
              isAuthenticated: this.props.isAuthenticated, 
              errorMessage: this.props.errorMessage, 
              accounts: this.props.accounts,
              accountCreds: this.props.accountCreds,
              user: this.props.user,
              posts: this.props.posts
            })}
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  posts: PropTypes.array,
  accounts: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

function mapStateToProps(state) {
  
  const { auth, accountFetch, accountCredsFetch, postFetch } = state
  const { isAuthenticated, user, errorMessage } = auth
  const { accounts, } = accountFetch
  const { accountCreds } = accountCredsFetch
  const { posts } = postFetch
  
  return {
    isAuthenticated,
    user,
    accounts,
    accountCreds,
    posts,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)

