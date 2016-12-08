import React, { Component, PropTypes } from 'react'
import { fetchPosts } from '../actions/postActions'
import Post from './Post'
import SearchBar from './SearchBar'

class ApprovedContainer extends Component {
  componentDidMount(){
    let dispatch = this.props.dispatch
    let username = this.props.params.userId
    let accountId = this.props.params.account_id
    console.log("within search component: ", this.props.params.account_id)
    console.log("within this.props: ", this.props)
    dispatch(fetchPosts(username, accountId))
  }
  render() {
    const { dispatch,  isAuthenticated, errorMessage, user, accounts, posts } = this.props
    let username = this.props.params.userId
    let accountId = this.props.params.account_id
    
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
          <SearchBar dispatch={dispatch} user={this.props.params.userId} account={this.props.params.account_id} />
        <div className="card-group">
          {this.props.posts.map(function(post, index){
              if ( !post.approved && !post.rated ) return (
                <Post
                key={ index }
                post={post}
                dispatch={dispatch} 
                user={username}
                account={accountId}
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
  dispatch: PropTypes.func.isRequired
}


export default ApprovedContainer

