import React, { Component, PropTypes } from 'react'
import { fetchAccounts } from '../actions/accountActions'
import AccountCard from './AccountCard'
import { Link } from 'react-router'
import BotNetContainer from '../containers/BotNetContainer'
import { Button } from 'react-bootstrap'

export default class Dashboard extends Component {
  componentDidMount(){
    let dispatch = this.props.dispatch
    const token = sessionStorage.getItem('id_token');
    let userInfo = this.unmarshallToken(token);    
    dispatch(fetchAccounts(userInfo.name))
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
    const token = sessionStorage.getItem('id_token');
    let userInfo = this.unmarshallToken(token);
    const { dispatch, isAuthenticated, user, accounts, errorMessage, posts } = this.props
    return (
      <div>
        {accounts.map(function(account, index){
            return (
              <AccountCard
                key={ index }
                account={account}
                dispatch={dispatch} 
                isAuthenticated={isAuthenticated}
              />)        
          })} 

        <Link to={'/' +
                    userInfo.name +
                    '/accounts' + 
                    '/new' } btn-primary
              className="btn btn-lg btn-default btn-block" >Add Account</Link>

      </div>
    )
  }

  handleClick(event){
    // let dispatch = this.props.dispatch
    // dispatch(addAccount(event))
  }

}
