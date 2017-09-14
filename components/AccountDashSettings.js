import React, { Component, PropTypes } from 'react'
import { twitterCredsUpdate } from '../actions/credsActions'
import { fetchCredsAccount } from '../actions/accountActions'
import AccountCard from './AccountCard'

export default class AccountDashSettings extends Component {
  componentWillMount(){
    let dispatch = this.props.dispatch
    console.log("praaaps", this.props)
    console.log(this.props.params.account_id)
    dispatch(fetchCredsAccount(this.props.params.account_id))
  }

  
  handleClick(event) {
    const consumerKey = this.refs.consumerKey.value.trim()
    const consumerSecret = this.refs.consumerSecret.value.trim()
    const accessToken = this.refs.accessToken.value.trim()
    const accessTokenSecret = this.refs.accessTokenSecret.value.trim()
    const creds = { accountId: this.props.params.account_id, consumerKey: consumerKey, consumerSecret: consumerSecret, accessToken: accessToken, accessTokenSecret: accessTokenSecret}
    this.props.dispatch(twitterCredsUpdate(creds))
  }    

  render() {
    const { dispatch, isAuthenticated, errorMessage, user, accounts, posts } = this.props
    let elementPos = this.props.accounts.map(function(x) {return x.id; }).indexOf(this.props.params.account_id);
  	let objectFound = this.props.accounts[elementPos];
    console.log("this the usssser: ", this.props)

    return (
      <div>
			<h1>{objectFound.title}</h1>
			<h2>Twitter Creds</h2>
        <input type='text' ref='consumerKey' className="form-control" placeholder={this.props.accountCreds.consumerKey || "consumer key"} style={{ marginRight: '5px' }} />
        <input type='text' ref='consumerSecret' className="form-control" placeholder={this.props.accountCreds.consumerSecret || "consumer secret"} style={{ marginRight: '5px' }} />
        <input type='text' ref='accessToken' className="form-control" placeholder={this.props.accountCreds.accessToken || "access token"} style={{ marginRight: '5px' }} />
        <input type='text' ref='accessTokenSecret' className="form-control" placeholder={this.props.accountCreds.accessTokenSecret || "access token secret"} style={{ marginRight: '5px' }} />
        <hr/>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary" type="button">Save!</button>
      </div>
    )
  }

}

AccountDashSettings.propTypes = {
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string
}