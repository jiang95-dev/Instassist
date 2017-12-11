// Load required packages
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var projectModel = require('./project');

var tagSchema = new mongoose.Schema({
    name: {
    	type: String,
    	required: true,
    	unique: true,
    },

    popularity: {
    	type: Number,
    	default: 0,
    },

    projects: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Project'} ],
});
tagSchema.plugin(uniqueValidator);

// Export the Mongoose model
module.exports = mongoose.model('Tag', tagSchema);
