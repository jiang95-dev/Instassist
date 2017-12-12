import React, { Component } from 'react';
import axios from 'axios';
import { Button, Header, Image, Modal, Label, Form, TextArea,Icon } from 'semantic-ui-react'
import styles from './styles.scss';



class NestedModal extends Component {
	constructor(props) {
		super();
		this.state = {
			popOpen : false,
		}
		this.handleClose = this.handleClose.bind(this);
		this.parentClose = props.parentClose;
	}

	handleClose(){
		this.setState({
			popOpen: false,
		})
		this.parentClose();
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			popOpen: nextProps.open,
		})
	}
	render() {
		return (
		  <Modal
		  	className="pop-up-modal"
		  	basic
		    size='tiny'
		    open={this.state.popOpen}
		  >
		    <Modal.Header><span>Yah! Your message has been sent!</span></Modal.Header>
		    <Modal.Actions>
		    	<Button color="green" inverted onClick={this.handleClose}>
		    	<Icon name="checkmark" id="ok-button"/> OK
		    	</Button>
		    </Modal.Actions>
		  </Modal>
		)
	}
}

export default NestedModal;
