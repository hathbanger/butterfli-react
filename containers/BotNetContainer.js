import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {ButtonGroup, FormGroup, ControlLabel, FormControl, Panel} from 'react-bootstrap'

class BotNetContainer extends Component {
  render() {
    const { dispatch, accounts,  isAuthenticated, errorMessage } = this.props
    console.log("this.props from botnet", this.props)
    return (
    	<div>
        <Panel>
            <h2>BotNet</h2>
    			    <FormGroup controlId="formControlsSelectMultiple">
    			      <ControlLabel>Select The Accounts For Your BotNet</ControlLabel>
    			      <FormControl componentClass="select" multiple>
    			      	{this.props.accounts.map(function(account, index){	
    						    return <option value={account.title}>{account.title}</option>			      		
    			      	})
    			      	}
    			      </FormControl>
    			    </FormGroup>
        </Panel>    
	    </div>
    )
  }
}

BotNetContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}


export default BotNetContainer

// http://localhost:1323/hathbanger/botnet/favorite/816434813875982336/accounts/586192ce38c96f4e1cb1bdf4+5861a67a38c96f2dd565db08+5862fa2038c96f5f4b05f9c5