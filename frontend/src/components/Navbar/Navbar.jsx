import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
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
				    <a><Link to="/createpost"><i className="plus icon large myPlus link"></i></Link></a>
				    <img alt="image" src="../../assets/avatar.png" className="myImage"/>
				</div>
			</div>
		);
	}

}

export default Navbar;




