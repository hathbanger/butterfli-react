import React, { Component, PropTypes } from 'react'
import { fetchPosts } from '../actions/postActions'
import { fetchCredsAccount, deleteAccount } from '../actions/accountActions'
import { Link } from 'react-router'
import SearchBar from './SearchBar'
import {Panel, ButtonGroup, SplitButton, MenuItem} from 'react-bootstrap'

export default class AccountCard extends Component {
  componentDidMount(){
    // this.props.dispatch(fetchPosts(this.props.account.username, this.props.account.id))
    // this.props.dispatch(fetchCredsAccount(this.props.account.id))
  }

  handleClick(username, accountId){
    this.props.dispatch(deleteAccount(username, accountId))
  }

  render() {
    const { errorMessage, dispatch, user, account } = this.props
    let username = this.props.account.username;
    let accountId = this.props.account.id;
    return (
      <div>
        <div className="col-sm-12">
            <Panel>
                <h2>{this.props.account.title}</h2>
                <ButtonGroup>
                  <Link 
                    to={'/'+username+'/accounts/'+accountId+'/search' } 
                    className="btn btn-primary" ><div className="glyphicon glyphicon-search"></div> Search</Link>
                  <Link 
                    to={'/'+username+'/accounts/'+accountId+'/approved' } 
                    className="btn btn-success" ><div className="glyphicon glyphicon-ok"></div> Approved</Link>
                  <Link 
                    to={'/'+username+'/accounts/'+accountId+'/settings' } 
                    className="btn btn-default" ><div className="glyphicon glyphicon-cog"></div> Settings</Link>
                  <button 
                    onClick={e => this.handleClick(username, accountId)} 
                    className="btn btn-danger" ><div className="glyphicon glyphicon-remove"></div> Delete</button>
                </ButtonGroup>  
            </Panel>    
        </div>
        <div className="clearfix"></div>
      </div>
    )
  }
  
}


// <p contentEditable={true} onChange={this.handleChange}>Hello</p> 