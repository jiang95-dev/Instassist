import React, { Component } from 'react'
import { Button, Input, Card, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'
import Navbar from '../Navbar/Navbar.jsx'

class Register extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                email: ''
            },

            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        // create a string for an HTTP body message
        const name = encodeURIComponent(this.state.user.username);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `name=${name}&email=${email}&password=${password}`;

        // create an AJAX POST request (This should probably done with Axios instead) 
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'https://mighty-oasis-90906.herokuapp.com/api/register');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log('The form is valid');
                this.setState({
                    message: 'Registered!'
                })
            } else {
                this.setState({
                    message: 'Unable to register'
                })
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
                <form className="Register" action="/" onSubmit={this.onSubmit}>
                    <Card className="rounded">
                        <Card.Content>
                            <Header as='h1'>
                                <Header.Content>
                                    Sign Up
                                </Header.Content>
                            </Header>
                            <Input className="auth-info" icon='mail' iconPosition='left' placeholder='Email' onChange={this.onChangeEmail}/>
                            <Input className="auth-info" type="password" icon='protect' iconPosition='left' placeholder='Password' onChange={this.onChangePassword}/>
                            <p>{this.state.message}</p>
                        </Card.Content>
                        <Card.Content>
                            <Input inverted type="submit" value="Group me up!" className="mySubmit" />
                            <h4 style={{ fontWeight: '200' }}>Already have an account? Sign in <Link id="login" to="/login">here</Link>!</h4>
                        </Card.Content>
                    </Card>
                </form>
            </div>
        )
    }
}

export default Register
