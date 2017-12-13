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
            errors: {
            	name: 'Project title is required!',
            	description: 'Project description is required!',
                tag_names: 'Tags are required!',
                required_skills: 'Skills are required!',
            },
            modified: {
            	name: false,
            	description: false,
            	tag_names: false,
            	required_skills: false
            },
        }
	}

	onSubmitForm(e){
		e.preventDefault();	
		//validation
		var validate =  this.state.modified.name && this.state.errors.name === '' &&
						this.state.modified.description && this.state.errors.description === '' &&
						this.state.modified.tag_names && this.state.errors.tag_names === '' &&
						this.state.modified.required_skills && this.state.errors.required_skills === '';
		if(!validate){
			const modified = this.state.modified;
	  		modified.name = true;
	  		modified.description = true;
	  		modified.tag_names = true;
	  		modified.required_skills = true;
	  		this.setState({modified});
			return;
		}
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

		//send request
		var instance = axios.create({
			headers: {'x-access-token': localStorage.getItem('jwtToken'),
						'Content-Type': 'application/json'}
		});
		var data = JSON.stringify(parsed_data)
		instance.post('https://mighty-oasis-90906.herokuapp.com/api/projects', data)
		.then(function(res){
			console.log(res);
			_this.props.closeModalHandler();
			//_this.props.history.push('/dashboard');
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
        const error = this.state.errors;
  		if(project.name === ''){
  			error.name = 'Project title is required!'
  			this.setState({error}); 
  		}else{
  			error.name = ''
  			this.setState({error});
  		}
  		const modified = this.state.modified;
  		modified.name = true;
  		this.setState({modified});
	}

	onChangeDescription(e){
		const project = this.state.project;
        project.description = e.target.value;
        this.setState({
            project
        });
        const error = this.state.errors;
  		if(project.description === ''){
  			error.description = 'Project description is required!'
  			this.setState({error}); 
  		}else{
  			error.description = ''
  			this.setState({error});
  		}
  		const modified = this.state.modified;
  		modified.description = true;
  		this.setState({modified});
	}

	onChangeTag(e){
		const project = this.state.project;
        project.tag_names = e.target.value;
        this.setState({
            project
        });
        const error = this.state.errors;
  		if(project.tag_names === ''){
  			error.tag_names = 'Tags are required!';
  			this.setState({error}); 
  		}else{
			var regex = /^\w+(,\w+)*$/;
			if(regex.test(project.tag_names)){
				error.tag_names = '';
  				this.setState({error});
			}else{
				error.tag_names = 'Tags must be comma separate string!';
  				this.setState({error});
			}
		}
		const modified = this.state.modified;
  		modified.tag_names = true;
  		this.setState({modified});
	}

	onChangeSkill(e){
		const project = this.state.project;
        project.required_skills = e.target.value;
        this.setState({
            project
        });
        const error = this.state.errors;
        if(project.required_skills === ''){
  			error.required_skills = 'Skills are required!';
  			this.setState({error}); 
  		}else{
			var regex = /^\w+(,\w+)*$/;
			if(regex.test(project.required_skills)){
				error.required_skills = '';
  				this.setState({error});
			}else{
				error.required_skills = 'Skills must be comma separate string!';
  				this.setState({error});
			}
		}
		const modified = this.state.modified;
  		modified.required_skills = true;
  		this.setState({modified});
	}


    render() {	
    	var title = (
			<div className="field">
		    	<label>Project Title</label>
		    	<input placeholder="Project Title" type="text" onChange={this.onChangeTitle.bind(this)}/>
		  	</div>
		);
    	var description = (
    		<div className="field">
		    	<label>Description</label>
		    	<textarea rows="10" onChange={this.onChangeDescription.bind(this)}></textarea>
		  	</div>
    	);
    	var tags = (
    		<div className="field">
	      		<label>Tags</label>
	      		<input placeholder="Tags" type="text" onChange={this.onChangeTag.bind(this)}/>
	    	</div>
    	);
    	var skills = (
			<div className="field">
		      	<label>Skills</label>
		      	<input placeholder="Skills" type="text" onChange={this.onChangeSkill.bind(this)}/>
		    </div>
    	);
    	if(this.state.modified.name && this.state.errors.name != ''){
    		var title = (
				<div className="field">
			    	<label>Project Title</label>
			    	<input className="input_border" placeholder="Project Title" type="text" onChange={this.onChangeTitle.bind(this)}/>
			  		<span style={{color: "red"}}>{this.state.errors["name"]}</span>
			  	</div>
			);
    	}
    	if(this.state.modified.description && this.state.errors.description != ''){
    		console.log("Here");
    		var description = (
				<div className="field">
			    	<label>Description</label>
			    	<textarea className="input_border" rows="10" onChange={this.onChangeDescription.bind(this)}></textarea>
			    	<span style={{color: "red"}}>{this.state.errors["description"]}</span>
			  	</div>
			);
    	}
    	if(this.state.modified.tag_names && this.state.errors.tag_names != ''){
    		var tags = (
	    		<div className="field">
		      		<label>Tags</label>
		      		<input className="input_border" placeholder="Tags" type="text" onChange={this.onChangeTag.bind(this)}/>
		    		<span style={{color: "red"}}>{this.state.errors["tag_names"]}</span>
		    	</div>
	    	)
    	}
    	if(this.state.modified.required_skills && this.state.errors.required_skills != ''){
    		var skills = (
				<div className="field">
			      	<label>Skills</label>
			      	<input className="input_border" placeholder="Skills" type="text" onChange={this.onChangeSkill.bind(this)}/>
			   		<span style={{color: "red"}}>{this.state.errors["required_skills"]}</span>
			    </div>
	    	)
    	}

        return(
        	<div className="myPost">
	        	<div className="ui attached message">
					<div className="header">Post a new project here!</div>
				  	<p>Fill out the form in detail so that others can have a clear understanding of your project</p>
				</div>
				<form className="ui form attached fluid segment" onSubmit={this.onSubmitForm.bind(this)}>
				  	{title}
				  	{description}
					<div className="two fields">
				    	{tags}
					    {skills}
				 	</div>
				  	<div className="inline field">
				    	<div className="ui checkbox">
				      		<input type="checkbox" id="terms"/>
				      		<label htmlFor="terms">I agree to the terms and conditions</label>
				    	</div>
				  	</div>
				  	<input type="submit" className="ui submit button"/>
				</form>
				<div className="ui bottom attached warning message">
			  		Have any questions? See <a href="#">here</a>.
				</div>
			</div>
        )
    }
}


export default CreatePost;



