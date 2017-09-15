import React, { Component, PropTypes } from 'react'
import { twitterCredsUpdate } from '../actions/credsActions'
import { fetchCredsAccount } from '../actions/accountActions'
import AccountCard from './AccountCard'

export default class AccountDashSettings extends Component {
  componentWillMount(){
    const token = sessionStorage.getItem('id_token');
    let dispatch = this.props.dispatch
    let user = this.unmarshallToken(token)
    const creds = { accountId: this.props.params.account_id, 
                    user: user}
    dispatch(fetchCredsAccount(creds))
  }
  unmarshallToken(token){
    if(token){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      var res = JSON.parse(window.atob(base64));
      return res;
    } 
  }
  
  handleClick(event) {
    const consumerKey = this.refs.consumerKey.value.trim()
    const consumerSecret = this.refs.consumerSecret.value.trim()
    const accessToken = this.refs.accessToken.value.trim()
    const accessTokenSecret = this.refs.accessTokenSecret.value.trim()
    const creds = { accountId: this.props.params.account_id, 
                    consumerKey: consumerKey, 
                    consumerSecret: consumerSecret, 
                    accessToken: accessToken, 
                    accessTokenSecret: accessTokenSecret}
    this.props.dispatch(twitterCredsUpdate(creds))
  }    

  render() {
    const { dispatch, isAuthenticated, errorMessage, user, accounts, posts } = this.props
    let elementPos = this.props.accounts.map(function(x) {return x.id; }).indexOf(this.props.params.account_id);
  	let objectFound = this.props.accounts[elementPos];

    return (
      <div>
			<h2>Twitter Creds</h2>
        <input 
          type='text' 
          ref='consumerKey' 
          className="form-control" 
          placeholder={this.props.accountCreds.consumerKey || "consumer key"} 
          style={{ marginRight: '5px' }} />
        <input 
          type='text' 
          ref='consumerSecret' 
          className="form-control" 
          placeholder={this.props.accountCreds.consumerSecret || "consumer secret"} 
          style={{ marginRight: '5px' }} />
        <input 
          type='text' 
          ref='accessToken' 
          className="form-control" 
          placeholder={this.props.accountCreds.accessToken || "access token"} 
          style={{ marginRight: '5px' }} />
        <input 
          type='text' 
          ref='accessTokenSecret' 
          className="form-control" 
          placeholder={this.props.accountCreds.accessTokenSecret || "access token secret"} 
          style={{ marginRight: '5px' }} />
        <hr/>
        <button 
          onClick={(event) => this.handleClick(event)} 
          className="btn btn-primary" 
          type="button">Save!</button>
      </div>
    )
  }

}


      // <h1>{objectFound.title}</h1>