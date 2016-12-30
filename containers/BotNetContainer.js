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
						return <option>{account.title}</option>			      		
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

