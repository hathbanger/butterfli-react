import React, { Component, PropTypes } from 'react'
import { fetchPosts } from '../actions/postActions'
import Post from './Post'
import SearchBar from './SearchBar'

class ApprovedContainer extends Component {
  componentDidMount(){
    let dispatch = this.props.dispatch
    console.log("thesep[rops", this.props)
    // dispatch(fetchPosts())
  }
  render() {
    const { dispatch,  isAuthenticated, errorMessage, posts } = this.props

    return (
      <div>
        <div className="container">
          <div className="jumbotron">
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

