import React, { Component, PropTypes } from 'react'
import { approvePost, disapprovePost, deletePost } from '../actions/postActions'
import { tweetPost } from '../actions/twitterActions'
import ContentEditable from 'react-contenteditable'
import {Col, Thumbnail, Well, Button} from 'react-bootstrap'

export default class Post extends Component {
  constructor(props){
      super(props)
      console.log(this.props.post.title.replace('https://t.co', ''))
      this.state = {html: this.props.post.title.replace('https://t.co', '')}
      // this.state = {html: decodeURIComponent(this.props.post.title)}
      this.handleChange = this.handleChange.bind(this)
  }  

  handleChange(evt){
    let strInputCode = evt.target.value
    this.setState({html: strInputCode})
  }

  handleBlur(evt){

  }

  render() {
    const { errorMessage, dispatch, user, account } = this.props
    return (
      <div>    
        <Col md={3}>
          <Thumbnail src={this.props.post.imgurl} >
            <Well bsSize="medium">
              <small>
              <ContentEditable
                    html={this.state.html}
                    disabled={false}       
                    onChange={this.handleChange}
                    onBlur={() => this.handlePostTitleEdit(this.state.html)}
                  />            
              </small>
            </Well>
            <p>
            {this.props.template != "Search" &&
              <Button onClick={(event) => this.handleTweetClick(event)} block bsStyle="primary">Tweet</Button>
            }
            {this.props.template != "Approve" &&
              <Button onClick={(event) => this.handleApproveClick(event)} block bsStyle="success">Approve</Button>
            }
              <Button onClick={(event) => this.handleDisapproveClick(event)} block bsStyle="warning">Disapprove</Button>
              <Button onClick={(event) => this.handleDeleteClick(event)} block bsStyle="danger">Delete</Button>
            </p>
          </Thumbnail>      
        </Col>
      </div>
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