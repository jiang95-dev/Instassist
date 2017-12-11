import React, { Component } from 'react'
import { Container, Grid, Divider, Image, Button, Card } from 'semantic-ui-react'
import MessageFeed from './MessageFeed.jsx'
import ProjectFeed from './ProjectFeed.jsx'
import SkillFeed from './SkillFeed.jsx'
import { Link } from 'react-router-dom'
import axios from 'axios'

import style from './dashboard.scss'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const username = "Yushi";
        const testArr = [{ name: 'Yushi' }, { name: 'Mathew' },{ name: 'Mathew' },{ name: 'Mathew' },{ name: 'Mathew' },{ name: 'Mathew' }]
        const skills = ["Java", "Javascript", "React", "Final Project", "PHP is the best language"]
        return (
            <Container className="dashboard">
                    <Grid stackable relaxed columns={3}>
                        <Grid.Column width={5}>
                            <Image src='https://freeiconshop.com/wp-content/uploads/edd/person-flat.png' size='small' circular />
                            <h1 className="user-name">{`Hi, ${username}`}</h1>
                            <p> Edit </p>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <SkillFeed skills={skills} />
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <MessageFeed events={null} />
                        </Grid.Column>
                    </Grid>
                <ProjectFeed projects={testArr} />
            </Container>
        );
    }
}