import React, { Component, PropTypes } from 'react'

export default class SignUp extends Component {
  
  componentWillMount(){
    // sessionStorage.removeItem('id_token')
  }

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props


    return (
        <div className='row'>
          <div className="container">
            <div className="col-md-6 col-md-offset-3">          
                <h4 className="text-center">Sign up</h4>
                <div className="form-group row">
                  <div className="">
                    <input type='text' ref='username' className="form-control" placeholder='Username'/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="">
                    <input type='password' ref='password' className="form-control" placeholder='Password'/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="offset-sm-2 ">
                    <button onClick={(event) => this.handleClick(event)} className="btn btn-primary btn-block">Sign up</button>
                  </div>
                </div>
            </div> 
          </div> 
        </div> 
    )
  }

  handleClick(event) {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onSignupClick(creds)
  }
}
