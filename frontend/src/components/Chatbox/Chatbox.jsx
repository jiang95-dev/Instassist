import React, { Component } from 'react'
import { Button, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './chatbox.scss'
import Messages from './Messages.jsx'

class Chatbox extends Component {
    constructor() {
        super();
        this.state = { 
            user: 'Xintong Wu'
        }
    }

    render() {
        return(
            <div className="chatbox">
                <div className="chatTitle">
                    {this.state.user}
                </div>
                <div className="chatContent">
                    <Messages/>
                    <Messages/>
                    <Messages/>
                    <Messages/>
                    <Messages/>
                    <Messages/>
                    <Messages/>
                    <Messages/>
                    <Messages/>
                    <Messages/>
                    <Messages/>
                    <Messages/>
                </div>
                <div>
                    <Input type="text" className="chatInput"/>
                    <Button positive>Send</Button>
                </div>
            </div>
        )
    }
}

export default Chatbox;
