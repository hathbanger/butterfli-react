import React, { Component, PropTypes } from 'react'
import { signUp } from '../actions/loginAndAuthActions'
import SignUp from '../components/SignUp'

class SignUpContainer extends Component {
  
  render() {
    const { dispatch,  isAuthenticated, errorMessage } = this.props

    return (
      <div>
        <SignUp 
        dispatch={dispatch} 
        onSignupClick={ creds => dispatch(signUp(creds)) }
        isAuthenticated={isAuthenticated}
        />
      </div>
    )
  }
}

SignUpContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}


export default SignUpContainer

