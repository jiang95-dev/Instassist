import React, { Component } from 'react'
import { Container, Grid, Image, Button, Card } from 'semantic-ui-react'
import MessageFeed from './MessageFeed.jsx'
import ProjectFeed from './ProjectFeed.jsx'
import SkillFeed from './SkillFeed.jsx'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Navbar from '../Navbar/Navbar.jsx'
import style from './dashboard.scss'
import PostModal from '../CreatePost/PostModal.jsx'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            editing: false,
            username: "",
            description: "",
            projects: [],
            skills: [],
            toOpen: false
        }

        this.token = localStorage.getItem('jwtToken');

        this.id = null;
        this.userUrl = null;
        this.logOut = this.logOut.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
        this.openModalHandler = this.openModalHandler.bind(this);
        this.fetchUser();
    }

    componentWillMount() {
        if (!this.token) {
            this.props.history.push('/login');
        }
    }

    fetchUser() {
        let profileUrl = "https://mighty-oasis-90906.herokuapp.com/api/profile";
        axios.get(profileUrl, {
            headers: { "x-access-token": this.token }
        }).then((response) => {
            this.id = response.data._id;
            this.userUrl = "https://mighty-oasis-90906.herokuapp.com/api/user/" + this.id;
            console.log(response.data)
            let username = response.data.username ? response.data.username : "Anonymous";
            
            this.setState({
                username: username,
                description: response.data.description,
                skills: response.data.skills,
                projects: response.data.projects
            });
        });
    }

    updateProfile(shouldUpdate) {
        if (shouldUpdate && this.userUrl) {
            axios.patch(this.userUrl, { 
                    username: this.state.username, description: this.state.description 
                }, { 
                    headers: { 
                        "x-access-token": this.token
                    } 
                }).then((response) => {
                    let username = response.data.username ? response.data.username : "";
                    this.setState({
                        username: username,
                        description: response.data.description,
                        editing: false
                    });
            });
        }
    }

    addSkill(newSkill) {
        console.log(newSkill)
        axios.patch(this.userUrl, { 
                skills: this.state.skills.concat(newSkill)
            }, { 
                headers: { 
                    "x-access-token": this.token
                } 
            }).then((response) => {
                console.log(response.data.skills)
                this.setState({
                    skills: response.data.skills
                });
        });
    }

    logOut(){
        localStorage.removeItem('jwtToken');
        this.props.history.push('/mainpage');
    }

    closeModalHandler(e){
        this.setState({toOpen : false});
    }

    openModalHandler(e){
        this.setState({toOpen : true});
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
                        onKeyPress={e => this.updateProfile(e.key == 'Enter')}
                    />
                </Card.Header>
            );
            description = (
                <Card.Description>
                    <input 
                        value={this.state.description}
                        onChange={e => this.setState({ description: e.target.value })} 
                        onKeyPress={e => this.updateProfile(e.key == 'Enter')}
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
            description = (
                <Card.Description>
                    {this.state.description}
                </Card.Description>
            );
            editButton = "Edit";
        }

        return (
            <div>
                <Navbar/>
                <Container className="dashboard">
                        <Grid stackable relaxed columns={3}>
                            <Grid.Column width={5}>
                            <Card centered raised={this.state.editing}>
                                <Image src='http://jimenezylievanoabogados.com/en/wp-content/themes/jimenezylievanoabogados/images/no_image_profile.jpg' />
                                <Card.Content>
                                    {nameField}
                                    {description}
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                        <Button onClick={() => this.setState({ editing: !this.state.editing })} basic color='green'>{editButton}</Button>
                                        <Button basic color='red' onClick={this.logOut}>Log Out</Button>
                                    </div>
                                </Card.Content>
                            </Card> 
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <SkillFeed skills={this.state.skills} addSkill={this.addSkill} />
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <MessageFeed events={null} />
                            </Grid.Column>
                        </Grid>
                    <ProjectFeed style={{marginTop: '2em'}} projects={this.state.projects} openModalHandler={this.openModalHandler}/>
                </Container>
                <PostModal toOpen={this.state.toOpen} closeModalHandler={this.closeModalHandler}/>
            </div>
        );
    }
}