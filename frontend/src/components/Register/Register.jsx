import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
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
        xhr.open('post', '/api/register');
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
                    <Card className="Register__content">
                        <div>
                            <h1>Sign up</h1>
                            <label>Email</label><br/>
                            <input className="myInput" onChange={this.onChangeEmail} />
                            <br/><br/>
                            <label>Password</label><br/>
                            <input className="myInput" onChange={this.onChangePassword} />
                            <br/><br/>
                            <p>{this.state.message}</p>
                            <Input type="submit" />
                            <h4>Already have an account? Sign in <Link to="/login">here</Link> ! </h4>
                        </div>
                    </Card>
                </form>
            </div>
        )
    }
}

export default Register
