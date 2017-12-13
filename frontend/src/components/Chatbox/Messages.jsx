import React, { Component } from 'react'
import { Button, Input, Feed } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './messages.scss'

class Messages extends Component {
	constructor() {
        super();
        this.state = { 
            content: 'You added Elliot Fu to the group Coworkers',
            user: ''
        }
    }
    
    render() {
        return(
            <Feed>
			    <Feed.Event className="myFeedEvent">
				    <Feed.Label>
				        <img src='https://freeiconshop.com/wp-content/uploads/edd/person-flat.png' />
				    </Feed.Label>
				    <Feed.Content>
				        {this.state.content}
				    </Feed.Content>
			    </Feed.Event>
		  	</Feed>
        )
    }
}

export default Messages;
