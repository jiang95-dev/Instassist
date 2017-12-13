import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import styles from './styles.scss'
import Navbar from '../Navbar/Navbar.jsx'
import axios from 'axios';
//import CreatePost from '../CreatePost/CreatePost.jsx'


import { sentUserId, subscribeToRefresh, connectSocket  } from '../../app.jsx'

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
            if (xhr.status === 200) {
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
                    <div className="ui card">
                        <div>
                            <h1>Sign In</h1>
                            <label>Email</label><br/>
                            <input className="myInput" onChange={this.onChangeEmail} />
                            <br/><br/>
                            <label>Password</label><br/>
                            <input type="password" className="myInput" onChange={this.onChangePassword} />
                            <br/><br/>
                            <p>{this.state.message}</p>
                            <Input type="submit" value="Group me in!" className="mySubmit"/>
                            <h4>No account? Register <Link to="/register">here</Link> ! </h4>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login
