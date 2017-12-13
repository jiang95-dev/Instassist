import React, { Component } from 'react'
import { Button, Input, Card, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios';

import styles from './styles.scss'
import Navbar from '../Navbar/Navbar.jsx'


import { connectSocket  } from '../../../../socketEvents.jsx'

class Login extends Component {

    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                email: ''
            },
            message: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        // create an AJAX request (This should probably done with Axios instead) 
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'https://mighty-oasis-90906.herokuapp.com/api/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.response['auth']) {
                this.setState({
                    message: 'Successfully logged in!'
                });
                //redirect
                this.props.history.push('/mainpage');
                //set token
                var token = xhr.response['token'];
                localStorage.setItem('jwtToken', token);


                // subscribe to socket
                // tell it my user id
                connectSocket(token);

            } else {
                this.setState({
                    message: 'Unable to log in'
                });
            }
        });
        xhr.send(formData);
        
    }

    onChangeEmail(e) {
        const user = this.state.user;
        user.email = e.target.value;
        this.setState({
            user
        })
    }

    onChangePassword(e) {
        const user = this.state.user;
        user.password = e.target.value;
        this.setState({
            user
        })
    }

    render() {
        return(
            <div>
                <Navbar/>
                <form className="Login" action="/" onSubmit={this.onSubmit}>
                    <Card className="rounded">
                        <Card.Content>
                            <Header as='h1'>
                                <Header.Content>
                                    Sign In
                                </Header.Content>
                            </Header>
                            <Input className="auth-info" icon='mail' iconPosition='left' placeholder='Email' onChange={this.onChangeEmail}/>
                            <Input className="auth-info" type="password" icon='protect' iconPosition='left' placeholder='Password' onChange={this.onChangePassword}/>
                            <p>{this.state.message}</p>
                        </Card.Content>
                        <Card.Content>
                            <Input inverted type="submit" value="Group me in!" className="mySubmit" />
                            <h4 style={{ fontWeight: '200' }}>No account? Register <Link id="register" to="/register">here</Link>!</h4>
                        </Card.Content>
                    </Card>
                </form>
            </div>
        )
    }
}

export default Login
