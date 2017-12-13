import React, { Component } from 'react'
import { Button, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            postList: null,
            count: 1,
            msg: null            
        }
    }

    componentDidMount(){
        console.log('Mainpage page will mount!')      
        let URLProject = 'https://mighty-oasis-90906.herokuapp.com/api/projects?sort={"popularity": -1}';
        axios.get(URLProject)
        .then((response) => {
            this.setState({
                postList: response.data.data,
                msg: response.data.data[0]
            })
            
            if (this.state.postList.length > 3){
                this.setState({
                    postList: response.data.data.slice(0, 3),
                })
            }
            setInterval(()=>{
                console.log("Timer running");
                // console.log(this.state.postList[this.state.count])
                this.setState({msg: this.state.postList[this.state.count]}); // swap the text
                if (this.state.count >= 2){
                    this.setState({count: 0});
                }else{
                    this.setState({count: (this.state.count+1)});
                }
            }, 2000);
            // console.log(this.state.postList);          
        })
        .catch((error) => {
            console.log(error);
        })


    }

    render() {
        if (!this.state.msg) {
            // console.log("Here");
            return <div />
        } else {  
            return(
                <div className="background">
                    <div className="Home">
                        <div>
                            <h1 className="logo">Groupin</h1>
                            <p className="title">Your Online Project Billboard</p>
                            {/* <input type="text" placeholder="Finding a project?" className="myInput"/> */}
                            <div className="myInput">
                                <Link to="/Login"><Button>Log in</Button></Link>
                                <Link to="/Register"><Button>Register</Button></Link>
                            </div>
                        </div>
                        <div className="info">
                            <div className="stick-top"></div>
                            <p className="footer-title">{this.state.msg.name}</p>
                            <p className="footer-body">{this.state.msg.description}</p>
                            <div className="stick-bottom"></div>
                        </div>
                        
                    </div>
                    <Link to="/mainpage">
                        <div className="continue">
                            <p className="continue-text">Skip</p>
                            <i className="triangle right icon big myTriangle"></i>
                        </div>
                    </Link>
                </div>
            )
        }
    }
}

export default Home
