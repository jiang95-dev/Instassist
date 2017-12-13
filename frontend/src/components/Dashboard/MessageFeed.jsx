import React, { Component } from 'react'
import { Message, Feed } from 'semantic-ui-react'

const MessageFeed = ({events}) => {
    let feed, feeds = [];
    if (events) { 
        Object.keys(events).forEach((k) => {
            if (events[k].length <= 1 || !events[k][1]) return;
            var project_name = events[k][0]
            var username = events[k][1].sender.username || "unknown";
            var content = events[k][1].body || "Didn't say anything";
            feeds.push({'meta' : username + ' for ' + project_name, 'summary' : content})
        })

        feed = <Feed events={feeds} />
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