import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './styles.scss';

class CreatePost extends Component {

	constructor(props){
		super();
		this.state = {
            project: {
                name: '',
                description: '',
                tag_names: '',
                required_skills: '',
            },
            message: ''
        }
	}

	onSubmitForm(e){
		e.preventDefault();	
		var _this = this;
		
		//parse first
		const tags = this.state.project.tag_names.split(',');
		const skills = this.state.project.required_skills.split(',');
		var parsed_data = {
			name : this.state.project.name,
			description : this.state.project.description,
			tag_names : tags,
			required_skills : skills
		};
		console.log(parsed_data);

		console.log(localStorage.getItem('jwtToken'));
		var instance = axios.create({
			headers: {'x-access-token': localStorage.getItem('jwtToken'),
						'Content-Type': 'application/json'}
		});
		
		var data = JSON.stringify(parsed_data)
		//axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMmRjYmI3MTllMjkxNmE3NDg3N2Q5NyIsImlhdCI6MTUxMjk1MDc0MCwiZXhwIjoxNTEzMDM3MTQwfQ.Qeh7sqU9m_xm2wQFCjWzUGo6z7ycFi8e6gDBOPlmTP4';
		instance.post('https://mighty-oasis-90906.herokuapp.com/api/projects', data)
		.then(function(res){
			console.log(res);
			_this.props.history.push('/dashboard');
		})
		.catch(function(err){
			console.log(err);
		});
	}

	onChangeTitle(e){
		const project = this.state.project;
        project.name = e.target.value;
        this.setState({
            project
        });
	}

	onChangeDescription(e){
		const project = this.state.project;
        project.description = e.target.value;
        this.setState({
            project
        });
	}

	onChangeTag(e){
		const project = this.state.project;
        project.tag_names = e.target.value;
        this.setState({
            project
        });
	}

	onChangeSkill(e){
		const project = this.state.project;
        project.required_skills = e.target.value;
        this.setState({
            project
        });
	}

    render() {	
        return(
        	<div className="myPost">
	        	<div className="ui attached message">
					<div className="header">Post a new project here!</div>
				  	<p>Fill out the form in detail so that others can have a clear understanding of your project</p>
				</div>
				<form className="ui form attached fluid segment" onSubmit={this.onSubmitForm.bind(this)}>
				  	<div className="field">
				    	<label>Project Title</label>
				    	<input placeholder="Project Title" type="text" onChange={this.onChangeTitle.bind(this)}/>
				  	</div>
				  	<div className="field">
				    	<label>Description</label>
				    	<textarea rows="10" onChange={this.onChangeDescription.bind(this)}></textarea>
				  	</div>
					<div className="two fields">
				    	<div className="field">
				      		<label>Tags</label>
				      		<input placeholder="Tags" type="text" onChange={this.onChangeTag.bind(this)}/>
				    	</div>
					    <div className="field">
					      	<label>Skills</label>
					      	<input placeholder="Skills" type="text" onChange={this.onChangeSkill.bind(this)}/>
					    </div>
				 	</div>
				  	<div className="inline field">
				    	<div className="ui checkbox">
				      		<input type="checkbox" id="terms"/>
				      		<label htmlFor="terms">I agree to the terms and conditions</label>
				    	</div>
				  	</div>
				  	<input type="submit" className="ui blue submit button"/>
				</form>
				<div className="ui bottom attached warning message">
			  		Have any questions? See <a href="#">here</a>.
				</div>
			</div>
        )
    }
}


export default CreatePost;



