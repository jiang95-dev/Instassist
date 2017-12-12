import React, { Component } from 'react'
import { Container, Grid, Image, Button, Card } from 'semantic-ui-react'
import MessageFeed from './MessageFeed.jsx'
import ProjectFeed from './ProjectFeed.jsx'
import SkillFeed from './SkillFeed.jsx'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Navbar from '../Navbar/Navbar.jsx'
import style from './dashboard.scss'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            editing: false,
            username: "Ushi",
            description: "Ready to get to know me?"
        }
    }

    logout(){
        localStorage.removeItem('jwtToken');
        this.props.history.push('/mainpage');
    }

    render() {
        const testArr = [{ name: 'Yushi' }, { name: 'Mathew' },{ name: 'Mathew' },{ name: 'Mathew' },{ name: 'Mathew' },{ name: 'Mathew' }]
        const skills = ["Java", "Javascript", "React", "Final Project", "PHP is the best language"]
        
        let nameField;
        let description;
        let editButton;
        if (this.state.editing) {
            nameField = (
                <Card.Header className="user-name">
                    {"Hi, "} 
                    <input 
                        value={this.state.username}
                        onChange={e => this.setState({ username: e.target.value })} 
                    />
                </Card.Header>
            );
            description = (
                <Card.Description>
                    <input 
                        value={this.state.description}
                        onChange={e => this.setState({ description: e.target.value })} 
                    />
                </Card.Description>
            );
            editButton = "Done";
        } else {
            nameField = (
                <Card.Header className="user-name">
                    {`Hi,  ${this.state.username}`}
                </Card.Header>
            );
            description = <Card.Description>{this.state.description}</Card.Description>;
            editButton = "Edit";
        }

        return (
            <div>
                <Navbar/>
                <Container className="dashboard">
                        <Grid stackable relaxed columns={3}>
                            <Grid.Column width={5}>
                            <Card centered >
                                <Image src='http://jimenezylievanoabogados.com/en/wp-content/themes/jimenezylievanoabogados/images/no_image_profile.jpg' />
                                <Card.Content>
                                    {nameField}
                                    {description}
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                        <Button onClick={() => this.setState({ editing: !this.state.editing })} basic color='green'>{editButton}</Button>
                                        <Button basic color='red' onClick={this.logout.bind(this)}>Log Out</Button>
                                    </div>
                                </Card.Content>
                            </Card> 
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <SkillFeed skills={skills} />
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <MessageFeed events={null} />
                            </Grid.Column>
                        </Grid>
                    <ProjectFeed style={{marginTop: '2em'}} projects={testArr} />
                </Container>
            </div>
        );
    }
}