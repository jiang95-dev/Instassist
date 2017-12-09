import React, { Component } from 'react'
import { Button, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

class Home extends Component {
    render() {
        return(
            <div className="background">
                <div className="Home">
                    <div>
                        <h1 className="logo">Groupin</h1>
                        <p className="title">Your Online Project Billboard</p>
                        <input type="text" placeholder="Finding a project?" className="myInput"/>
                    </div>
                    <div className="stick"></div>
                    <p className="footer-title">Project Name</p>
                    <div>
                        <i class="trophy icon big"></i>
                        <i class="trophy icon big"></i>
                        <i class="trophy icon big"></i>
                        <i class="trophy icon big"></i>
                    </div>
                    <p className="footer-body">This is a random string. It makes no sense. Please replace the</p>
                    <p>sentence with what you want.</p>
                    <div className="stick"></div>

                    
                </div>
                <Link to="/dashboard">
                    <div className="continue">
                        <p className="title continue-text">Continue</p>
                        <i class="triangle right icon big myTriangle"></i>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Home
