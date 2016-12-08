import React, { Component, PropTypes } from 'react'
import { search } from '../actions/searchActions'

export default class SearchBar extends Component {
  
  render() {
    const { dispatch, user, accounts } = this.props
    console.log('props from searchbar', this.props)
    return (
			 <div className="form-group">
                <div className="input-group">
                  <input type="text" className="form-control" ref='searchTerm' placeholder="Search for..."/>
                  <span className="input-group-btn">
                    <button onClick={(event) => this.handleClick(event)} className="btn btn-primary" type="button">Search!</button>
                  </span>
                </div>
              </div>
    )
  }

  handleClick(event) {
    const searchTerm = this.refs.searchTerm.value.trim()
    const username = this.props.user
    const accountId = this.props.account
    console.log("handle click in searchbar", this.props)
    this.props.dispatch(search(username, accountId, searchTerm))
  }  
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired
}


             