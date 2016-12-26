import React, { Component, PropTypes } from 'react'
import { fetchPosts } from '../actions/postActions'
import { fetchCredsAccount } from '../actions/accountActions'
import { Link } from 'react-router'

export default class AccountCard extends Component {
  componentDidMount(){
    console.log('this.props', this.props)
    this.props.dispatch(fetchPosts(this.props.account.username, this.props.account.id))
    this.props.dispatch(fetchCredsAccount(this.props.account.id))
  }
  render() {
    const { errorMessage, dispatch, user, account } = this.props
    return (
      <div>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-block">
                <h2>{this.props.account.title}</h2>
                <Link to={'/'+this.props.account.username+'/accounts/'+this.props.account.id + '/search' } className="btn btn-primary" >Search</Link>
                <Link to={'/'+this.props.account.username+'/accounts/'+this.props.account.id + '/approved' } className="btn btn-primary" >Approved</Link>
                <Link to={'/'+this.props.account.username+'/accounts/'+this.props.account.id + '/settings' } className="btn btn-primary" >Settings</Link>
                
            </div>
          </div>      
        </div>
        <div className="clearfix"></div>
      </div>
    )
  }
  
}

AccountCard.propTypes = {
  errorMessage: PropTypes.string
}


// <p contentEditable={true} onChange={this.handleChange}>Hello</p> 