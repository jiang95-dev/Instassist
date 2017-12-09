import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './styles.scss';

class CreatePost extends Component {

	constructor(props){
		super();
	}

    render() {	
        return(
        	<div class="myPost">
	        	<div class="ui attached message">
					<div class="header">Post a new project here!</div>
				  	<p>Fill out the form in detail so that others can have a clear understanding of your project</p>
				</div>
				<form class="ui form attached fluid segment">
				  	<div class="two fields">
				    	<div class="field">
				      		<label>Name</label>
				      		<input placeholder="Name" type="text"/>
				    	</div>
					    <div class="field">
					      	<label>Contact</label>
					      	<input placeholder="Contact" type="text"/>
					    </div>
				 	</div>
				  	<div class="field">
				    	<label>Project Title</label>
				    	<input placeholder="Project Title" type="text"/>
				  	</div>
				  	<div class="field">
				    	<label>Description</label>
				    	<textArea rows="10"></textArea>
				  	</div>
				  	<div class="field">
				    	<label>Tags</label>
				    	<input placeholder="I don't know what the concrete form of tags is" type="text"/>
				  	</div>
				  	<div class="inline field">
				    	<div class="ui checkbox">
				      		<input type="checkbox" id="terms"/>
				      		<label for="terms">I agree to the terms and conditions</label>
				    	</div>
				  	</div>
				  	<div class="ui blue submit button">Submit</div>
				</form>
				<div class="ui bottom attached warning message">
			  		Have any questions? See <a href="#">here</a>.
				</div>
			</div>
        )
    }
}


export default CreatePost;



