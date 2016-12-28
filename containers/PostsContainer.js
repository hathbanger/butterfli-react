import React, { Component, PropTypes } from 'react'
import Post from '../components/Post'
import { approvePost, disapprovePost, deletePost } from '../actions/postActions'
import { tweetPost } from '../actions/twitterActions'

class PostsContainer extends Component {

  render() {
    const { dispatch,  isAuthenticated, errorMessage, account, user, posts } = this.props
    console.log('account from PC', this.props)
    let template = this.props.template
    return (
      <div>
      
        <div className="card-group">
          {posts.map(function(post, index){
              return (
                <Post
                    key={ index }
                    post={ post }
                    dispatch={ dispatch } 
                    user={ user }
                    account={ account }
                    isAuthenticated={ isAuthenticated }
                    approvePost={creds => dispatch(approvePost(posts, creds))}
                    disapprovePost={creds => dispatch(disapprovePost(posts, creds))}
                    deletePost={creds => dispatch(deletePost(posts, creds))}
                    tweetPost={creds => dispatch(tweetPost(creds))}
                    template={template}
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

