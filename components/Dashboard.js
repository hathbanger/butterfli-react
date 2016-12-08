import React, { Component, PropTypes } from 'react'
import { fetchAccounts } from '../actions/accountActions'
import AccountCard from './AccountCard'

export default class Dashboard extends Component {
  componentDidMount(){
    let dispatch = this.props.dispatch
    dispatch(fetchAccounts(this.props.user))
    console.log('this.props:::', this.props)
  }
  render() {
    const { dispatch, isAuthenticated, user, errorMessage, posts } = this.props
    return (
      <div>
          {this.props.accounts.map(function(account, index){
              return (
                <AccountCard
                key={ index }
                account={account}
                dispatch={dispatch} 
                isAuthenticated={isAuthenticated}
                />)        
            })} 
      </div>
    )
  }

}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string
}