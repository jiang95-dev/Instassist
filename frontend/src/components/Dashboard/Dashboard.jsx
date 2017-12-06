import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        }

        this.logOut = this.logOut.bind(this);

    }

    componentDidMount() {
        axios.get('/api/profile').then( (res) => {
            console.log(res);
            this.setState({
                isLoggedIn: true
            })
        }).catch( (err) => {
            this.setState({
                isLoggedIn: false
            })
        })
    }

    logOut() {
        axios.get('/api/logout').then( (res) => {
            console.log("Logged out");
        })
    }

    render() {

        if (this.state.isLoggedIn) {
            return(
                <div className="Dashboard">
                    <Card>
                        <h1>Welcome to the App!</h1>
                        <p>You are now logged in.</p>

                        <Link to="/" onClick={this.logOut}>
                            Log out
                        </Link>
                    </Card>
                </div>
            )
        } else {
            return(
                <div className="Dashboard">
                    <Card>
                        <h1>You must log in before you can see this page.</h1>
                        <Link to="/">
                            Back
                        </Link>
                    </Card>
                </div>
            )
        }
    }
}

export default Dashboard
