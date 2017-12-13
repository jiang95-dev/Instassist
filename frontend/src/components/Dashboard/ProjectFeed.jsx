import React, { Component } from 'react'
import { Card, Grid, Message, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import style from './project-feed.scss'

const ProjectFeed = ({ style, projects, create, visibilityHandler, openModalHandler }) => {
    let feed;
    if (projects) {
        feed = projects.map(project => {
            console.log(project)
            let tags = project.tags.map((tag, idx_t) => {
                console.log(project._id)
                return (
                    <Label key={project.name + project._id + idx_t} basic>{tag.name}</Label>
                )
            })
            console.log(project.status);
            return (
                <Grid.Column key={project._id} style={{ width: 'auto' }}>
                    <Card
                        className="rounded projects"
                    >
                        <Card.Content>
                            <Card.Header>
                                <Icon 
                                className="visibility" 
                                name={project.status ? 'hide' : 'unhide' } 
                                onClick={e => visibilityHandler(project)}/>
                                <span className={project.status ? 'h' : 's'}>
                                {project.name}
                                </span>
                            </Card.Header>
                            <Card.Description>
                                <span className={project.status ? 'h' : 's'}>
                                {project.description}
                                </span>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            {tags}
                        </Card.Content>
                    </Card>
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
