import React, { Component, PropTypes } from 'react'
import Login from './Login'
import Logout from './Logout'
import Auth from '../containers/Auth'
import { loginUser, logoutUser } from '../actions/loginAndAuthActions'
import { Link } from 'react-router'

const token = sessionStorage.getItem('id_token');
export default class Navbar extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
      <nav className='navbar navbar-light bg-faded'>
        <div className='container-fluid'>
          <Link to="/" className="navbar-brand" >Butterfli</Link>
           <div className='navbar-form form-inline float-right'>
           <Auth 
            dispatch={dispatch}
          />
           {!isAuthenticated &&
             <Login
               errorMessage={errorMessage}
               onLoginClick={ creds => dispatch(loginUser(creds)) }
             />
           }
           {isAuthenticated &&
             <Logout onLogoutClick={() => dispatch(logoutUser())} />
           }
         </div>
       </div>
     </nav>
    )
  }

}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}