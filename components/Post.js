import React, { Component, PropTypes } from 'react'
import { approvePost, disapprovePost, deletePost } from '../actions/postActions'
import { tweetPost } from '../actions/twitterActions'
import {Col, Thumbnail, Button} from 'react-bootstrap'

export default class Post extends Component {
  render() {
    const { errorMessage, dispatch, user, account } = this.props
    return (
      <div>
        <Col md={3}>
          <Thumbnail src={this.props.post.imgurl} >

            {this.props.template != "Search" &&
              <Button onClick={(event) => this.handleTweetClick(event)} block bsStyle="primary">Tweet</Button>
            }
            {this.props.template != "Approve" &&
              <Button onClick={(event) => this.handleApproveClick(event)} block bsStyle="success">Approve</Button>
            }
              <Button onClick={(event) => this.handleDisapproveClick(event)} block bsStyle="warning">Disapprove</Button>
              <Button onClick={(event) => this.handleDeleteClick(event)} block bsStyle="danger">Delete</Button>
          </Thumbnail>      
        </Col>
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