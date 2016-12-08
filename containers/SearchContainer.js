import React, { Component, PropTypes } from 'react'
import { fetchPosts } from '../actions/postActions'
import Post from '../components/Post'
import SearchBar from '../components/SearchBar'

class PostsContainer extends Component {
  componentDidMount(){
    let dispatch = this.props.dispatch
    console.log("psosts container", this.props)
    // dispatch(fetchPosts())
  }
  render() {
    const { dispatch,  isAuthenticated, errorMessage, posts } = this.props

    return (
      <div>
        <SearchBar dispatch={dispatch} />
        <div className="card-group">
          {this.props.posts.map(function(post, index){
              if (!post.approved && !post.rated ) return (
                <Post
                key={ index }
                post={post}
                dispatch={dispatch} 
                onSignupClick={ creds => dispatch(signUp(creds)) }
                isAuthenticated={isAuthenticated}
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

