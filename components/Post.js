import React, { Component, PropTypes } from 'react'
import { approvePost, disapprovePost, deletePost } from '../actions/postActions'
import { tweetPost } from '../actions/twitterActions'

export default class Post extends Component {
  render() {
    const { errorMessage, dispatch, user, account } = this.props
    return (
      <div>
        <div className="col-sm-3">
          <div className="card">
            <img className="img-fluid card-img-top" src={this.props.post.imgurl} alt="Card image cap"/>
            <div className="card-block">
              <a onClick={(event) => this.handleTweetClick(event)} className="btn btn-primary btn-block">Tweet</a>
              <a onClick={(event) => this.handleApproveClick(event)} className="btn btn-success btn-block">Approve</a>
              <a onClick={(event) => this.handleDisapproveClick(event)} className="btn btn-warning btn-block">Disapprove</a>
              <a onClick={(event) => this.handleDeleteClick(event)} className="btn btn-danger btn-block">Delete</a>
            </div>
          </div>      
        </div>
      </div>
    )
  }
  

  handleTweetClick(event) {
    let text = ""
    const creds = { username: this.props.post.username, 
                    accountId: this.props.post.account, 
                    postId: this.props.post.id, 
                    tweetText: text } 
    this.props.tweetPost(this.props.post)
  }

  handleApproveClick(event) {
    this.props.approvePost(this.props.post)
  }

  handleDisapproveClick(event) {
    this.props.disapprovePost(this.props.post)
  }

  handleDeleteClick(event) {
    this.props.deletePost(this.props.post)
  }


}

Post.propTypes = {
  errorMessage: PropTypes.string
}


// <p contentEditable={true} onChange={this.handleChange}>Hello</p> 