import React, { Component } from 'react';
import { Dropdown, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'
//import avatar from '../../assets/avatar.jpeg'

class Navbar extends Component{

	constructor(){
		super();
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
	}

	inputChangeHandler(event){
        let searchkey = event.target.value;
        console.log(searchkey);
        this.props.search(searchkey);
    }

	render(){
		if(localStorage.getItem('jwtToken') != null){
			var create = (
				<Link to="/createpost"><i className="plus icon large myPlus link"></i></Link>
			);
			var avatar = (
				<Link to="/dashboard">
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
			<div className="ui secondary menu navbar">
				<Link to="/mainpage"><div className="myLogo">Groupin</div></Link>
				<div className="item">
				    <div className="ui icon input">
				    	<input onChange={this.inputChangeHandler}  type="text" placeholder="Search..." className="myInput"/>
				        <i className="search link icon"></i>
				    </div>
				</div>
				<div className="right menu">
				    {create}
				    {avatar}
				</div>
			</div>
		);
	}

}

export default Navbar;




