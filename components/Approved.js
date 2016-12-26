import React, { Component, PropTypes } from 'react'
import { fetchPosts } from '../actions/postActions'
import Post from './Post'
import PostsContainer from '../containers/PostsContainer'

class ApprovedContainer extends Component {
  componentDidMount(){
    let dispatch = this.props.dispatch
    // dispatch(fetchPosts())
  }
  render() {
    const { dispatch,  isAuthenticated, errorMessage, posts } = this.props
    let username = this.props.params.userId
    let accountId = this.props.params.account_id    
    let filteredPosts = this.props.posts.filter(function(post){
      return post.approved && post.rated && post.account == accountId
    })
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
          <PostsContainer dispatch={this.props.dispatch} posts={filteredPosts} user={username} account={accountId} />
        <div className="card-group">
          {this.props.posts.map(function(post, index){
              if ( post.approved && post.rated ) return (
                <Post
                key={ index }
                post={post}
                dispatch={dispatch} 
                isAuthenticated={isAuthenticated}
                />)        
            })}        
        </div>
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

