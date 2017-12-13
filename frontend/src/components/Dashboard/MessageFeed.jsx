import React, { Component } from 'react'
import { Message, Feed } from 'semantic-ui-react'

const MessageFeed = ({events}) => {
    let feed;
    if (events) { 
        var msgs;
        events.forEach( (c) => {
            console.log(c);
            c.forEach( (m) => {
                console.log(m.sender);
                console.log(m.body)
                msgs.push({"meta": "LL", "summary": "Let me join!"});
            })
        });
        feed = <Feed events={[{"meta": "LL", "summary": "Let me join!"}]} />
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