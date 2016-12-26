import React, { Component, PropTypes } from 'react'
import { twitterCredsUpdate } from '../actions/twitterActions'
import { fetchCredsAccount } from '../actions/accountActions'
import AccountCard from './AccountCard'

export default class AccountDashSettings extends Component {
  componentWillMount(){
    let dispatch = this.props.dispatch
    console.log("praaaps", this.props)
    console.log(this.props.params.account_id)
    dispatch(fetchCredsAccount(this.props.params.account_id))
  }

  componentDidMount(){
  }
  
  handleClick(event) {
    const consumerKey = this.refs.consumerKey.value.trim()
    const consumerSecret = this.refs.consumerSecret.value.trim()
    const accessToken = this.refs.accessToken.value.trim()
    const accessTokenSecret = this.refs.accessTokenSecret.value.trim()
    const creds = { consumerKey: consumerKey, consumerSecret: consumerSecret, accessToken: accessToken, accessTokenSecret: accessTokenSecret }
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
        <input type='text' ref='consumerKey' className="form-control" value={this.props.accountCreds.consumerKey} style={{ marginRight: '5px' }} placeholder='consumer key'/>
        <input type='text' ref='consumerSecret' className="form-control" value={this.props.accountCreds.consumerSecret} style={{ marginRight: '5px' }} placeholder='consumer secret'/>
        <input type='text' ref='accessToken' className="form-control" value={this.props.accountCreds.accessToken} style={{ marginRight: '5px' }} placeholder='access token'/>
        <input type='text' ref='accessTokenSecret' className="form-control" value={this.props.accountCreds.accessTokenSecret} style={{ marginRight: '5px' }} placeholder='access token secret'/>
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