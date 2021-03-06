import React, { Component, PropTypes } from 'react'
import { fetchPosts } from '../actions/postActions'
import Post from './Post'
import SearchBar from './SearchBar'
import PostsContainer from '../containers/PostsContainer'

class ApprovedContainer extends Component {
  componentDidMount(){
    console.log('approved container componentDidMount')
    let dispatch = this.props.dispatch
    let username = this.props.params.userId
    let accountId = this.props.params.account_id
    console.log(username)
    console.log(accountId)
    console.log('approved container about to dispatch')
    dispatch(fetchPosts(username, accountId))
  }
  render() {
    const { dispatch,  isAuthenticated, errorMessage, user, accounts, posts } = this.props
    let username = this.props.params.userId
    let accountId = this.props.params.account_id
    console.log('this.props in search', this.props)
    const filteredPosts = this.props.posts.filter(function(post){
      return !post.approved && !post.rated && post.account == accountId
    })

    console.log('this.props in search', this.props)
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <SearchBar 
              dispatch={dispatch} 
              user={this.props.params.userId} 
              account={this.props.params.account_id} />
            <PostsContainer 
              dispatch={this.props.dispatch} 
              posts={filteredPosts} 
              user={username} 
              account={accountId} 
              template={"Search"}
              />
          </div>
        </div>
      </div>
    )
  }
}

ApprovedContainer.propTypes = {
  posts: PropTypes.array,
  dispatch: PropTypes.func.isRequired
}


export default ApprovedContainer

