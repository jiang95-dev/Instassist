import React, { Component } from 'react'
import { Card, Grid, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import style from './project-feed.scss'

const ProjectFeed = ({ style, projects, create, openModalHandler }) => {
    let feed;
    if (projects) {
        feed = projects.map(project => {
            console.log(project)
            return (
                <Grid.Column key={project._id} style={{ width: 'auto' }}>
                    <Card
                        className="rounded projects"
                        header={project.name}
                        description={project.description}
                    />
                </Grid.Column>
            )
        });
    }

    return (
        <section style={style} className="my-projects">
            <h1>My Projects</h1>
            <Grid className="row">
                <Grid.Column key="add" style={{ width: 'auto' }}>
                    <Card className="rounded projects" onClick={openModalHandler}>
                        <p style={{ height: '100%', fontSize: '50pt', lineHeight: '250px', textAlign: 'center', verticalAlign: 'center' }}> + </p>
                    </Card>
                </Grid.Column>
                {feed}
            </Grid>
        </section>
    )
}

export default ProjectFeed;
