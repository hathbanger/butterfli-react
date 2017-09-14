import React, { Component, PropTypes } from 'react'
import { fetchAccounts } from '../actions/accountActions'
import AccountCard from './AccountCard'
import BotNetContainer from '../containers/BotNetContainer'
import { Button } from 'react-bootstrap'


export default class Dashboard extends Component {
  componentDidMount(){
    let dispatch = this.props.dispatch
    dispatch(fetchAccounts(this.props.user))
  }
  render() {
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
        <Button 
          bsSize="large" 
          block
          onClick={event => this.handleClick(event)}>Add Account</Button>
      </div>
    )
  }

  handleClick(event){
    let dispatch = this.props.dispatch
    dispatch(addAccount(event))
  }

}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string
}