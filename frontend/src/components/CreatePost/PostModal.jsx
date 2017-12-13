import React, { Component } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import CreatePost from './CreatePost.jsx'

class PostModal extends Component{

	constructor(){
		super();
	}

	render(){
		return (
			<Modal open={this.props.toOpen} onClose={this.props.closeModalHandler}>
			    <CreatePost closeModalHandler={this.props.closeModalHandler}/>
			</Modal>

		);
	}

}

export default PostModal;