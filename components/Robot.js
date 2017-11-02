import React, { Component, PropTypes } from 'react'
import { fetchPosts } from '../actions/postActions'
import Post from './Post'
import SearchBar from './SearchBar'
import PostsContainer from '../containers/PostsContainer'

class Robot extends Component {
  componentDidMount(){
    let dispatch = this.props.dispatch
    let username = this.props.params.userId
    let accountId = this.props.params.account_id
    // dispatch(fetchPosts(username, accountId))
  }

  handleFavoriteClick(event) {
    const searchTerm = encodeURIComponent(this.refs.searchTerm.value.trim())
    let count = this.refs.favoriteCount.value.trim()
    let accountId = this.props.params.account_id
    let username = this.props.params.userId
    console.log("FAVE COUNT", count)
    this.favorite(username, accountId, searchTerm, count);
  }

  handleUnfavoriteClick(event) {
    let count = this.refs.unfavoriteCount.value.trim()
    let accountId = this.props.params.account_id
    let username = this.props.params.userId
    console.log("UNFAVE COUNT", count)
    this.unfavorite(username, accountId, count);
  }

favorite(username, accountId, text, count) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `searchTerm=${text}&count=${count}`
  }
  console.log("FAVORITE count", count)
  let url = 'http://localhost:1323/'+username+'/accounts/'+accountId+'/favorite/twitter';
    fetch(url, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            // dispatch(favoriteFailure(response))
            return Promise.reject(response)
          }
          else {
            // dispatch(favoriteSuccess()) 
            // dispatch(fetchPosts(username, accountId))
          }
        })
}
unfavorite(username, accountId, count) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `count=${count}`
  }
  console.log("UNFAVORITE count", count)
  let url = 'http://localhost:1323/'+username+'/accounts/'+accountId+'/unfavorite/twitter';
    fetch(url, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            // dispatch(favoriteFailure(response))
            return Promise.reject(response)
          }
          else {
            console.log("USER: ", user)
          }
        })
}


  render() {
    const { dispatch,  isAuthenticated, errorMessage, user, accounts, posts } = this.props
    let username = this.props.params.userId
    let accountId = this.props.params.account_id
    const filteredPosts = this.props.posts.filter(function(post){
      return !post.approved && !post.rated && post.account == accountId
    })

    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <h3>Robot</h3>
              <div className="form-inline">
                <div className="input-group">
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <input type="text" className="form-control" ref='searchTerm' id="inlineFormInputGroup" placeholder="Search for..."/>
                  </div>
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <input type="text" className="form-control" ref='favoriteCount' placeholder="Choose a number"/>
                  </div>
                  <span className="input-group-btn">
                    <button onClick={(event) => this.handleFavoriteClick(event)} className="btn btn-primary" type="button">Search!</button>
                  </span>
                </div>
                <hr/>
                <div className="input-group">
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <input type="text" className="form-control" ref='unfavoriteCount' placeholder="Choose a number"/>
                  </div>
                  <span className="input-group-btn">
                    <button onClick={(event) => this.handleUnfavoriteClick(event)} className="btn btn-primary" type="button">Unfavorite!</button>
                  </span>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Robot

