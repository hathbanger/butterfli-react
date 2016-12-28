import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class BotNetContainer extends Component {
  render() {
    const { dispatch,  isAuthenticated, errorMessage } = this.props
    return (
    	<div>
	        <div className="col-sm-12">
	          <div className="card">
	            <div className="card-block">
	                <h2>BotNet</h2>
	                
	            </div>
	          </div>      
	        </div>
	        <div className="clearfix"></div>
	    </div>
    )
  }
}

BotNetContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}


export default BotNetContainer

