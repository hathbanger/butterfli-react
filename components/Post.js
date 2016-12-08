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
    let text = "catsAreassholes.."
    // let tweetText = encodeURI(text);
    // console.log(tweetText)
    const creds = { postId: this.props.post.id, tweetText: text }
    console.log('tweet!', creds)
    this.props.dispatch(tweetPost(creds))
  }

  handleApproveClick(event) {
    const creds = { pic_id: this.props.post.id }
    this.props.dispatch(approvePost(this.props.post.id))
  }

  handleDisapproveClick(event) {
    const creds = { pic_id: this.props.post.id }
    this.props.dispatch(disapprovePost(this.props.post.id))
  }

  handleDeleteClick(event) {
    console.log("delete click props: ",this.props)
    const creds = { user: this.props.user, account: this.props.account, post_id: this.props.post.id }
    this.props.dispatch(deletePost(creds))
  }




  handleChange(event){
    console.log('change!');
  }

}

Post.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}


// <p contentEditable={true} onChange={this.handleChange}>Hello</p> 