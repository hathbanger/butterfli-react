import React, { Component, PropTypes } from 'react'
import { twitterCredsUpdate } from '../actions/credsActions'
import { createAccount } from '../actions/accountActions'
import AccountCard from './AccountCard'
import { hashHistory } from 'react-router'

export default class AccountSettings extends Component {
  
  handleClick(event) {
    const token = sessionStorage.getItem('id_token');
    const accountTitle = this.refs.accountTitle.value.trim()
    const creds = { username: this.unmarshallToken(token).name, 
    				        accountTitle: accountTitle}
    this.props.dispatch(createAccount(creds))
    hashHistory.push('/');
  }    
  unmarshallToken(token){
    if(token){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      var res = JSON.parse(window.atob(base64));
      return res;
    } 
  }
  render() {
    const { dispatch, isAuthenticated, errorMessage, user, accounts, posts } = this.props
    let elementPos = this.props.accounts.map(function(x) {return x.id; }).indexOf(this.props.params.account_id);
  	let objectFound = this.props.accounts[elementPos];

    return (
      <div>
        <input 
        	type='text' 
        	ref='accountTitle' 
        	className="form-control" 
        	placeholder="Account Title"
        	style={{ marginRight: '5px' }} />
        <hr/>
        <button 
        	onClick={(event) => this.handleClick(event)} 
        	className="btn btn-primary" 
        	type="button">Create!</button>
      </div>
    )
  }

}
