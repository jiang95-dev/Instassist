import React, { Component } from 'react';
import axios from 'axios';
import { Button, Header, Image, Modal, Label, Form, TextArea,Icon } from 'semantic-ui-react'
import styles from './styles.scss';
import {subscribeToTimer} from '../../app.jsx'

class MessageView extends Component{
	constructor(props){
		super();
		this.handleClose = this.handleClose.bind(this);
		this.state = {
			modalOpen : true,
			selected: null,
			message: false,
			pop: false,
			timestamp: "No timestamp yet",
		}
		this.handleJoin = this.handleJoin.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.renderMessageAction = this.renderMessageAction.bind(this);
		this.renderReplyAction = this.renderReplyAction.bind(this);
		this.renderMessageContent = this.renderMessageContent.bind(this);


		// subscribeToTimer((err, timestamp) => {
		// 	this.setState({ 
		// 		timestamp 
		// 	});
		// });

		
	}


	componentWillReceiveProps(nextProps){
		this.setState({
			modalOpen : nextProps.open,
			selected : nextProps.selected,
		});
	}

	handleClose(event, data){
		console.log("Close modal");
		this.setState({
			modalOpen: false,
			message: false,
			pop: false,
		})
	}

	handleJoin(){
		console.log("Action Clicked!");
		this.setState({
			message: true,
		})
	}
	
	handleSubmit(value){
		console.log("On Submit!");
		console.log(this.state.selected)
		console.log(value);

		this.setState({
			pop: true,
		})
	}

	renderMessageContent(description, skills){
		return (
			<Modal.Content as="div" className="content bg-blue" scrolling>
				<div className="description">
					<p>{description}</p>
				</div>
				<div className="skills">
					{skills}
				</div>
			</Modal.Content>
		);
	}

	renderMessageAction(){
		return (
			<Modal.Actions className="bg-blue">
				<Button onClick={this.handleJoin}>
				Reply
				</Button>
				<Button onClick={this.handleJoin}>
				Maybe Later
				</Button>
			</Modal.Actions>
		);
	}

	renderReplyAction(){
		return (
			<Modal.Actions className="bg-blue">
			<MessageForm handleSubmit={this.handleSubmit}/>
			</Modal.Actions>
		);
	}

	render(){	
		console.log("ModalView");
		
		var obj = this.state.selected;
		var message = obj? obj.message : "No Message Selected"; // message ?
		var sender = obj? obj.creator_name : "Spider Man"  // creator_name???
		var time = obj? obj.time_created.substr(0, 9) : "Jan 1st 2019"; // time_created?

		if (this.state.message){
			var content = (<div/>);
			var action = this.renderReplyAction();
		}else{
			content = this.renderMessageContent(message);
			action = this.renderMessageAction();
		}
		console.log("This is the timestamp: " + this.state.timestamp );
		return ( 
			<div>
		  	<Modal className="default-modal"
		  	open={this.state.modalOpen}
		  	onClose={this.handleClose}>
				<Header as="h1" className="header bg-blue">
					<p> {sender} </p>
					<Header.Subheader size="tiny">
					<p> On {time} </p>
					</Header.Subheader>
				</Header>
				{content}
				{action}
			</Modal>
			</div>	
		);
	}
}

class MessageForm extends Component {
	constructor(props){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.parentSubmit = props.handleSubmit
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			// value: "",
		}
	}

	handleChange(event){
		this.setState({value: event.target.value});
	}

	handleSubmit(event, data){
		this.parentSubmit(this.state.value);
	}

	render(){
		return (
			<Form onSubmit={this.handleSubmit}>
			    <TextArea 
			    placeholder='Comments here...'  
			    style={{ minHeight: 300 }}
			    value={this.state.value}
			    onChange={this.handleChange}
			    />
				<Button type="submit">
					Send!
				</Button>
			</Form>
		);
	}
}

export default MessageView;







