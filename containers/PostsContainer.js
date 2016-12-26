import React, { Component, PropTypes } from 'react'
import Post from '../components/Post'
import { approvePost, disapprovePost, deletePost } from '../actions/postActions'
import { tweetPost } from '../actions/twitterActions'

class PostsContainer extends Component {

  render() {
    const { dispatch,  isAuthenticated, errorMessage, account, user, posts } = this.props
    return (
      <div>
        <div className="card-group">
          {posts.map(function(post, index){
              if (!post.approved && !post.rated ) return (
                <Post
                    key={ index }
                    post={ post }
                    dispatch={ dispatch } 
                    user={ user }
                    account={ account }
                    isAuthenticated={ isAuthenticated }
                    approvePost={creds => dispatch(approvePost(creds))}
                    disapprovePost={creds => dispatch(disapprovePost(creds))}
                    deletePost={creds => dispatch(deletePost(creds))}
                />)        
            })}        
        </div>
      </div>
    )
  }
}

PostsContainer.propTypes = {
  posts: PropTypes.array,
  dispatch: PropTypes.func.isRequired
}


export default PostsContainer

