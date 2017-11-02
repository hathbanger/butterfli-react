import React, { Component, PropTypes } from 'react'
import { twitterCredsUpdate } from '../actions/credsActions'
import { fetchCredsAccount, deleteAccount } from '../actions/accountActions'
import AccountCard from './AccountCard'
import {unmarshallToken} from '../actions/utility'

  const token = sessionStorage.getItem('id_token');
export default class AccountDashSettings extends Component {
  componentWillMount(){
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
  
  handleCredsClick(event) {
    console.log("this.props.params.account_id", this.props.params.account_id)
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

  handleDeleteClick() {
    let accountId = window.location.href.split("/")[6];
    let username = this.unmarshallToken(token).name
    this.props.dispatch(deleteAccount(username, accountId))
  } 

  render() {
    const { dispatch, isAuthenticated, accountCreds, errorMessage, user, accounts, posts } = this.props
    let elementPos = this.props.accounts.map(function(x) {return x.id; }).indexOf(this.props.params.account_id);
  	let objectFound = this.props.accounts[elementPos];

    return (
      <div>
			<h2>Twitter Creds</h2>
        <input 
          type='text' 
          ref='consumerKey' 
          className="form-control" 
          placeholder={accountCreds.consumerkey == "" ? "Enter a consumerkey" : accountCreds.consumerkey} 
          style={{ marginRight: '5px' }} />
        <input 
          type='text' 
          ref='consumerSecret' 
          className="form-control" 
          placeholder={accountCreds.consumersecret == "" ? "Enter a consumersecret" : accountCreds.consumersecret} 
          style={{ marginRight: '5px' }} />
        <input 
          type='text' 
          ref='accessToken' 
          className="form-control" 
          placeholder={accountCreds.accesstoken == "" ? "Enter a accesstoken" : accountCreds.accesstoken} 
          style={{ marginRight: '5px' }} />
        <input 
          type='text' 
          ref='accessTokenSecret' 
          className="form-control" 
          placeholder={accountCreds.accesstokensecret == "" ? "Enter a accesstokensecret" : accountCreds.accesstokensecret} 
          style={{ marginRight: '5px' }} />
        <hr/>
        <button 
          onClick={(event) => this.handleCredsClick(event)} 
          className="btn btn-primary" 
          type="button">Save!</button>
        <button 
          onClick={e => this.handleDeleteClick(user, objectFound)}
          className="btn btn-danger" ><div className="glyphicon glyphicon-remove"></div> Delete</button>                    
      </div>
    )
  }

}


      // <h1>{objectFound.title}</h1>