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
                tags: '',
                required_skills: '',
                creator_name: 'fixed',
                creaor_id: '5a2c2a4a99aa9913d0a07218'
            },

            message: ''
        }
	}

	onSubmitForm(e){
		e.preventDefault();
		console.log(this.state);
		/*axios.post('/api/projects', {name: "fixed",
			creator_name : "fixed",
			creaor_id: '5a2c2a4a99aa9913d0a07218'})
		.then(function(res){
			console.log(res);
		})
		.catch(function(err){
			console.log(err);
		});*/
		const name = encodeURIComponent(this.state.project.name);
        const description = encodeURIComponent(this.state.project.description);
        const required_skills = encodeURIComponent(this.state.project.required_skills);
        const formData = `name=${name}&description=${description}&required_skills={required_skills}&creaor_name={"1234"}&creaor_id={'5a2c2a4a99aa9913d0a07218'}`;

        // create an AJAX request (This should probably done with Axios instead) 
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/projects');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: 'Successfully logged in!'
                })
            } else {
                this.setState({
                    message: 'Unable to log in'
                })
            }
        });
        xhr.send(formData);

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
        project.tags = e.target.value;
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
				<form className="ui form attached fluid segment" action="/" onSubmit={this.onSubmitForm.bind(this)}>
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



