import React, { Component } from 'react';
import axios from 'axios';
import { Button, Header, Image, Modal, Label, Form, TextArea,Icon } from 'semantic-ui-react'
import styles from './styles.scss';
import NestedModal from './NestedModal.jsx'

//import { messageSent } from '../../../../socketEvents.jsx'


class ModalView extends Component{
	constructor(props){
		super();
		this.handleClose = this.handleClose.bind(this);
		this.state = {
			modalOpen : false,
			selected: null,
			message: false,
			pop: false,
		}
		this.handleJoin = this.handleJoin.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.renderMessageAction = this.renderMessageAction.bind(this);
		this.renderDetailAction = this.renderDetailAction.bind(this);
		this.renderDetailContent = this.renderDetailContent.bind(this);

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

		this.props.onClose();
	}

	handleJoin(){
		console.log("Action Clicked!");
		this.setState({
			message: true,
		})
	}
	
	handleSubmit(value){

		function messageSent(conversationId, to) {
			console.log("conv:"+conversationId);
			console.log("to:"+to);
    		socket.emit('new message', conversationId, to);
		}
		console.log("On Submit!");
		// console.log("selected item: "); console.log(this.state.selected)
		// console.log("value: " + value);
		
		this.setState({	pop: true,	})

		if (!value) {return;}

		var instance = axios.create({
		  timeout: 1000,
		  headers: {'X-Access-Token': localStorage.getItem("jwtToken")}, 
		});

		var to = this.state.selected.creator._id;
		var data = {'content' : value, 'projectId': this.state.selected._id};
		
		// var baseURL = 'http://localhost:8000/api'
		var baseURL= 'https://mighty-oasis-90906.herokuapp.com/api'
		var url = baseURL + '/chat/new/' + to;
		
		instance.post(url, data)
		.then((response) => {
			console.log("Create message success");
			console.log(response);
			var conversationId = response.data.conversationId;
			messageSent(conversationId, to);
		})
		.catch((error) => {
			console.log(error);
		})
		
	
	}

	renderDetailContent(description, skills){
		return (
			<Modal.Content as="div" className="content bg-grey" scrolling>
				<div className="description">
					<p>{description}</p>
				</div>
				<div className="skills">
					<h4>Required skills:</h4> {skills}
				</div>
			</Modal.Content>
		);
	}

	renderDetailAction(){
		return (
			<Modal.Actions className="bg-grey">
				<Button id="button-join" onClick={this.handleJoin}>
				Join the team!
				</Button>
			</Modal.Actions>
		);
	}

	renderMessageAction(){
		return (
			<Modal.Actions className="bg-grey">
			<MessageForm handleSubmit={this.handleSubmit}/>
			</Modal.Actions>
		);
	}

	render(){	
		console.log("===ModalView===");
		// console.log(var);

		var obj = this.state.selected;
		var project_name = obj? obj.name : "No Project Selected";
		var description = obj? obj.description : "No Description";
		var creator = obj? obj.creator.username : "Spider Man" ;// It need to be changed!
		var time = obj? obj.createdAt.substr(0, 9) : "A long long time ago"
		var tags = obj? obj['tags'].map( (t, idx) => {
				return ( <Label key={idx}> {t.name} </Label> )
			}) : (<Label> SpaceNullity </Label>);
		var skills = obj? obj['required_skills'].map( (s, idx) => {
				return ( <Label key={idx}> {s} </Label> )
			}) : skills = (<Label> Mighty </Label>)

		if (this.state.message){
			var content = (<div/>);
			var action = this.renderMessageAction();
		}else{
			content = this.renderDetailContent(description, skills);
			action = this.renderDetailAction();
		}

		return ( 
			<div>
			<NestedModal open={this.state.pop} parentClose={this.handleClose}/>
		  	<Modal className="default-modal"
		  	open={this.state.modalOpen}
		  	onClose={this.handleClose}>
				<Header as="h1" className="header bg-grey">
					<span> {project_name} </span>
					<Header.Subheader size="tiny">
					<div  className="extra">
						<div className="labels">
							{tags}
						</div>		
						<div className="meta">
							By {creator}, {time}
						</div>		
					</div>
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
			<Form id="form-message" onSubmit={this.handleSubmit}>
			    <TextArea 
					placeholder='Comments here...'  
					style={{ minHeight: 300 }}
					value={this.state.value}
					onChange={this.handleChange}
			    />
				<Button id="button-submit" type="submit">
					Send!
				</Button>
			</Form>
		);
	}
}

export default ModalView;


