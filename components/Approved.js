import React, { Component, PropTypes } from 'react'
import { fetchPosts } from '../actions/postActions'
import Post from './Post'
import PostsContainer from '../containers/PostsContainer'

class ApprovedContainer extends Component {
  componentWillMount(){
    this.props.dispatch(fetchPosts(this.props.params.userId, this.props.params.account_id))    
  }
  render() {
    const { dispatch,  isAuthenticated, errorMessage, posts } = this.props
    let username = this.props.params.userId
    let accountId = this.props.params.account_id    
    const filteredPosts = this.props.posts.filter(function(post){
        return post.rated && post.approved && post.account == accountId
    })
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <PostsContainer 
              dispatch={this.props.dispatch} 
              posts={filteredPosts} 
              user={username} 
              account={accountId}
              template={"Approve"} />
          </div>
        </div>
      </div>
    )
  }
}

ApprovedContainer.propTypes = {
  posts: PropTypes.array,
  dispatch: PropTypes.func
}


export default ApprovedContainer

