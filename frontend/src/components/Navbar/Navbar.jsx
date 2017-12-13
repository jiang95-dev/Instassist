import React, { Component } from 'react';
import { Dropdown, Image, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'
import PostModal from '../CreatePost/PostModal.jsx'

class Navbar extends Component{

	constructor(){
		super();
		this.state = {
			toOpen : false
		}
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.closeModalHandler = this.closeModalHandler.bind(this);
	}

	inputChangeHandler(event){
        let searchkey = event.target.value;
        console.log(searchkey);
        this.props.search(searchkey);
    }

    closeModalHandler(e){
    	this.setState({toOpen : false});
    }

	render(){
		if(localStorage.getItem('jwtToken') != null){
			var create = (
				<i className="plus icon large myPlus link" onClick={() => this.setState({toOpen : true})}></i>
			);
			var avatar = (
				<Link to="/dashboard" style={{ lineHeight: '46px' }}>
					<img alt="image" src="https://freeiconshop.com/wp-content/uploads/edd/person-flat.png" className="myImage"/>
				</Link>
			);
		}else{
			var create = (
				<Link to="/login"><i className="plus icon large myPlus link"></i></Link>
			);
			var avatar = (
				<Link to="/login">
					<div className="myPlus">Sign in</div>
				</Link>
			)
		}
		
		return(
			<div>
				<div className="ui secondary menu navbar">
					<Link to="/mainpage"><div className="myLogo">Groupin</div></Link>
					<div className="item">
					    <div className="ui icon input">
							{/* <i className="search link icon"></i> */}
							<Input 
								icon='search'
								iconPosition='left' 
								transparent={true} 
								onChange={this.inputChangeHandler}  
								type="text" 
								placeholder="Search..." 
								className="myInput"
							/>
					    </div>
					</div>
					<div className="right menu">
					    {create}
					    {avatar}
					</div>
				</div>
				<PostModal toOpen={this.state.toOpen} closeModalHandler={this.closeModalHandler}/>
			</div>
		);
	}

}

export default Navbar;

