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
import Chatbox from '../Chatbox/Chatbox.jsx'


import { disconnetSocket } from '../../app.jsx'

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
        this.changeProjectVisibility = this.changeProjectVisibility.bind(this);
        this.fetchUser();
    }

    componentWillMount() {
        if (!this.token) {
            this.props.history.push('/login');
        }
    }

    fetchUser() {
        // let profileUrl = "http://localhost:8000";
        let profileUrl = "https://mighty-oasis-90906.herokuapp.com/api/profile";
        axios.get(profileUrl, {
            headers: { "x-access-token": this.token }
        }).then((response) => {
            console.log(response.data);
            this.id = response.data._id;
            // this.userUrl = "http://localhost:8000/api/user/" + this.id;
            this.userUrl = "https://mighty-oasis-90906.herokuapp.com/api/user/" + this.id;
            // console.log(response.data)

            let username = response.data.username ? response.data.username : "Anonymous";
            let description = response.data.description;
            let skills = response.data.skills;
            let projects = response.data.projects

            var url = "https://mighty-oasis-90906.herokuapp.com/api/chat";
            // var url = "http://localhost:8000/api/chat";
            axios.get(url, {
                headers : { "x-access-token": this.token }
            }).then((response) =>  {
                console.log("load messages");
                console.log(response.data);
                this.setState({
                    username: username,
                    description: description,
                    skills: skills,
                    projects: projects,
                    /**/
                    messages : response.data,
                });
            }).catch((err) => {
                console.log(err);
            })
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

    changeProjectVisibility(project) {
        console.log(project);
        var projid = project._id;
        console.log(projid);
        let newProjects = this.state.projects.map(p => {
            if (p === project) {
                console.log("detect equality!")
                let newProject = Object.assign({}, project);
                newProject.status = newProject.status ^ 1;
                return newProject;
            } else {
                return p;
            }
        });
        // this.setState({projects: newProjects});
        // axios.put('https://mighty-oasis-90906.herokuapp.com/api/projects/'+projid+'/status', { 
        //         headers: { 
        //             "x-access-token": this.token
        //         } 
        //     }).then((response) => {
        //         console.log("Put success");
        // });
        //send request
        // var token = localStorage.getItem('jwtToken');
        // if (!token){
        //     console.log("no token");
        // }else{
        //     console.log("Pass");
        // }
		// var instance = axios.create({
		// 	headers: {'x-access-token': token,
        //                 'Content-Type': 'application/json',
        //                 'Access-Control-Allow-Origin':'*'
        //                 }
		// });
		// // var data = JSON.stringify(parsed_data)
		// instance.put('https://mighty-oasis-90906.herokuapp.com/api/projects/'+projid+'/status', JSON.stringify(''))
		// .then((response) => {
        //     console.log("Put success");
        // })
		// .catch(function(err){
		// 	console.log(err);
		// });

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
        disconnetSocket();
    }

    closeModalHandler(e){
        this.setState({toOpen : false});
    }

    openModalHandler(e){
        this.setState({toOpen : true});
    }

    render() {
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
                            <Grid.Column computer={5} mobile={16}>
                            <Card
                                centered
                                raised={this.state.editing}
                                className="rounded"
                            >
                                <Image src='http://jimenezylievanoabogados.com/en/wp-content/themes/jimenezylievanoabogados/images/no_image_profile.jpg' />
                                <Card.Content>
                                    {nameField}
                                    {description}
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                        <Button style={{ borderBottomLeftRadius: '8px' }}
                                            onClick={() => {
                                                if (this.state.editing) {
                                                    this.updateProfile(true);
                                                } else {
                                                    this.setState({ editing: true });
                                                }
                                            }} basic color='green'
                                        >
                                            {editButton}
                                        </Button>
                                        <Button style={{ borderBottomRightRadius: '8px' }} basic color='red' onClick={this.logOut}>
                                            Log Out
                                        </Button>
                                    </div>
                                </Card.Content>
                            </Card> 
                            </Grid.Column>
                            <Grid.Column computer={4} mobile={16}>
                                <SkillFeed skills={this.state.skills} addSkill={this.addSkill} />
                            </Grid.Column>
                            <Grid.Column computer={7} mobile={16}>
                                <MessageFeed events={this.state.messages} />
                            </Grid.Column>
                        </Grid>
                    <ProjectFeed style={{marginTop: '2em'}} projects={this.state.projects} visibilityHandler={this.changeProjectVisibility} openModalHandler={this.openModalHandler}/>
                </Container>
                <PostModal toOpen={this.state.toOpen} closeModalHandler={this.closeModalHandler}/>
            </div>
        );
    }
}