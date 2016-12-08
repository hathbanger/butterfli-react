import React, { Component, PropTypes } from 'react'
import { tweetPost } from '../actions/twitterActions'
import { Link } from 'react-router'

export default class AccountCard extends Component {
  
  render() {
    const { errorMessage, dispatch, user, account } = this.props
    console.log('this.props user', this.props)
    return (
      <div>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-block">
                <h2>{this.props.account.title}</h2>
                <Link to={'/'+this.props.account.username+'/account/'+this.props.account.id + '/search' } className="btn btn-primary" >Search</Link>
                <Link to={'/'+this.props.account.username+'/account/'+this.props.account.id + '/approved' } className="btn btn-primary" >Approved</Link>
                <Link to={'/'+this.props.account.username+'/account/'+this.props.account.id + '/settings' } className="btn btn-primary" >Settings</Link>
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