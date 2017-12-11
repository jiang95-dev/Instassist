import React, { Component } from 'react'
import { Card, Grid, Message } from 'semantic-ui-react'

import style from './project-feed.scss'

const ProjectFeed = ({projects}) => {
    let feed;
    if (projects) { 
        feed = projects.map(project => {
            return (
                <Grid.Column key={project} computer={4} mobile={16}>
                    <Card 
                        header={project.name}
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sem ipsum, gravida sit amet purus efficitur, placerat finibus augue. Sed vel sem sed arcu imperdiet pharetra ut non felis. In vel porttitor lorem. Quisque fringilla tellus sit amet justo imperdiet, varius malesuada eros hendrerit. "
                    />
                </Grid.Column>
            )
        });
    } else {
        feed = <Message 
        header='No messages yet :)' 
        content='Come back later for more messages!' />
    }

    return (
        <section className="my-projects">
            <h1>My Projects</h1>
            <Grid className="row" columns="equal">
                <Grid.Column key="add" computer={4} mobile={16}>
                    <Card
                        image="https://cdn.onlinewebfonts.com/svg/img_202916.png" />
                </Grid.Column>
                    {feed}
            </Grid>
        </section>
    )
}

export default ProjectFeed;