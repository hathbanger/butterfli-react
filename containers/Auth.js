import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {validateToken, logoutUser} from '../actions/loginAndAuthActions'
import {ButtonGroup, FormGroup, ControlLabel, FormControl, Panel} from 'react-bootstrap'

class Auth extends Component {
  
 	componentDidMount () {
	    const { dispatch, isAuthenticated, isFetching } = this.props
	    var id_token = sessionStorage.getItem('id_token');
	    var codeParam = location.href.split('code=')[1];
	    var validate = dispatch(validateToken(id_token));
	    if(codeParam){
	          hashHistory.push('/');
	    } else if(!id_token){
	      dispatch(logoutUser());
	    }
  	}

  	render() {
	    const { dispatch, accounts,  isAuthenticated, errorMessage } = this.props
	    return (
	    	<div>
				 
		    </div>
	    )
  	}
}


export default Auth

// http://localhost:1323/hathbanger/botnet/favorite/816434813875982336/accounts/586192ce38c96f4e1cb1bdf4+5861a67a38c96f2dd565db08+5862fa2038c96f5f4b05f9c5