import React, { Component } from 'react'
import { Message, Feed } from 'semantic-ui-react'

const MessageFeed = ({events}) => {
    let feed;
    if (events) { 
        feed = <Feed events={events} />
    } else {
        feed = <Message 
        header='No messages yet :)' 
        content='Come back later for more messages!' />
    }

    return (
        <section className="message-feed">
            <h1 className="header">My Message</h1>
            {feed}
        </section>
    )
}

export default MessageFeed;