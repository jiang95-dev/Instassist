import React, { Component } from 'react';
import { Dropdown, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'
//import avatar from '../../assets/avatar.jpeg'

class Navbar extends Component{

	constructor(){
		super();
	}

	render(){
		return(
			<div className="ui secondary menu navbar">
				<div className="myLogo">Groupin</div>
				<div className="item">
				    <div className="ui icon input">
				    	<input type="text" placeholder="Search..." className="myInput"/>
				        <i className="search link icon"></i>
				    </div>
				</div>
				<div className="right menu">
				    <Link to="/createpost"><i className="plus icon large myPlus link"></i></Link>
					<img alt="image" src="https://freeiconshop.com/wp-content/uploads/edd/person-flat.png" className="myImage"/>
				</div>
			</div>
		);
	}

}

export default Navbar;




