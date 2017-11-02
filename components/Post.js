import React, { Component, PropTypes } from 'react'
import { approvePost, disapprovePost, deletePost } from '../actions/postActions'
import { tweetPost } from '../actions/twitterActions'
import ContentEditable from 'react-contenteditable'
import {Col, Thumbnail, Well, Button} from 'react-bootstrap'

export default class Post extends Component {
  constructor(props){
      super(props)
      this.state = {html: decodeURIComponent(this.props.post.title.replace('https://t.co', ''))}
      // this.state = {html: decodeURIComponent(this.props.post.title)}
      this.handleChange = this.handleChange.bind(this)
  }  

  handleChange(evt){
    let strInputCode = evt.target.value
    this.setState({html: strInputCode})
  }

  render() {
    const { errorMessage, dispatch, user, account } = this.props
    var tweeted = this.props.post.twitterid.length > 0;
    return (
          <Thumbnail src={this.props.post.imgurl} >
            <Well>
              <small>
                {!tweeted &&
                  <ContentEditable
                    html={this.state.html}
                    disabled={false}
                    onChange={this.handleChange}
                    onBlur={() => this.handlePostTitleEdit(this.state.html)}
                  />
                }
                {tweeted &&
                  <p className="text-center">
                    {this.state.html}
                  </p>
                }
              </small>
            </Well>
              <p>
              {this.props.template != "Search" &&
                <Button 
                  disabled={tweeted} 
                  onClick={(event) => this.handleTweetClick(event)} 
                  block 
                  bsStyle="primary">{tweeted ? "Already tweeted..":"Tweet"}</Button>
              }
              
              {tweeted &&
                <a href={"https://twitter.com/statuses/" + this.props.post.twitterid}>Go to tweet..</a>
              }

              {!tweeted &&
                <div>
                  {this.props.template != "Approve" &&
                    <Button onClick={(event) => this.handleApproveClick(event)} block bsStyle="success">Approve</Button>
                  }
                  <Button onClick={(event) => this.handleDisapproveClick(event)} block bsStyle="warning">Disapprove</Button>
                  <Button onClick={(event) => this.handleDeleteClick(event)} block bsStyle="danger">Delete</Button>
                </div>
              }
              </p>
          </Thumbnail>      
    )
  }

  handleTweetClick(event) {
    // let text = ""
    console.log('tweetEvent!', this.props)
    const creds = { username: this.props.post.username, 
                    accountId: this.props.post.account, 
                    postId: this.props.post.id, 
                    tweetText: this.props.post.title }


    this.props.tweetPost(creds)
  }

  handlePostTitleEdit(event) {

    let re = /%26nbsp%3B/gi;
    event = event.replace(re, "%20")  
    event = event.replace(/(<([^>]+)>)/ig, "")  
      
    const creds = { postId: this.props.post.id, 
                    tweetText: encodeURIComponent(event) }
    this.props.editPostTitle(creds)
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