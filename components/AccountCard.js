import React, { Component, PropTypes } from 'react'
import { fetchPosts } from '../actions/postActions'
import { fetchCredsAccount } from '../actions/accountActions'
import { Link } from 'react-router'
import SearchBar from './SearchBar'
import {Panel, ButtonGroup, SplitButton, MenuItem} from 'react-bootstrap'

export default class AccountCard extends Component {
  componentDidMount(){
    console.log('this.props from account AccountCard', this.props)
    this.props.dispatch(fetchPosts(this.props.account.username, this.props.account.id))
    this.props.dispatch(fetchCredsAccount(this.props.account.id))
  }
  render() {
    const { errorMessage, dispatch, user, account } = this.props
    return (
      <div>
        <div className="col-sm-12">
            <Panel>
                <h2>{this.props.account.title}</h2>
                <ButtonGroup>
                <Link to={'/'+this.props.account.username+'/accounts/'+this.props.account.id + '/search' } className="btn btn-primary" >Search</Link>
                <Link to={'/'+this.props.account.username+'/accounts/'+this.props.account.id + '/approved' } className="btn btn-primary" >Approved</Link>
                <Link to={'/'+this.props.account.username+'/accounts/'+this.props.account.id + '/settings' } className="btn btn-primary" >Settings</Link>
                </ButtonGroup>  

                <SearchBar 
                  dispatch={dispatch} 
                  user={this.props} 
                  account={this.props} />   

                <h4>Favitron-5000</h4>   
                <ButtonGroup>
                  <SplitButton title={this.props.account.title}>
                    <MenuItem eventKey="1">Action</MenuItem>
                    <MenuItem eventKey="2">Another action</MenuItem>
                    <MenuItem eventKey="3">Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="4">Separated link</MenuItem>
                  </SplitButton>
                </ButtonGroup>           
            </Panel>    
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