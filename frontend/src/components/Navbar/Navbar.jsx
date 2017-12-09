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
			<div class="ui secondary menu navbar">
				<div class="myLogo">Groupin</div>
				<div class="item">
				    <div class="ui icon input">
				    	<input type="text" placeholder="Search..." class="myInput"/>
				        <i class="search link icon"></i>
				    </div>
				</div>
				<div class="right menu">
				    <a><Link to="/createpost"><i class="plus icon large myPlus link"></i></Link></a>
				    <img alt="image" src="../../assets/avatar.png" class="myImage"/>
				</div>
			</div>
		);
	}

}

export default Navbar;




