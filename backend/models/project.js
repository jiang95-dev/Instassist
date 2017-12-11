// Load required packages
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var projectSchema = new mongoose.Schema({
    "name": { 
    	type: String, // required
		required: [true, "A name is required."],
        unique: true,
	},
	
	"description": {
		type: String,
		default: "The creator didn't say anything about it yet",
	}, // has default
	
	"time_created": { 
        type: Date, 
        default: Date.now,
        set: function(val){ return this.time_created}, // cannot change time_created   
    }, // auto

    "creator_id": {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "A creator id is requirend."],
        // set: function(val){ return this.creator_id}, // cannot change creator
    }, // required

    "tags": {
    	type: [mongoose.Schema.Types.ObjectId],
    	default: [],
    }, // has default

    // ============================NEW ATTRIBUTES========================= //
    "tag_names": {
        type: [String],
        default: [],
    },

    "creator_name": {
        type: String,
        required: [true, "A creator name is required."],
    },

    "popularity": {
        type: Number,
        default: 0,
    },

    "status": {
        type: Number,
        default: 1,
    },

     "required_skills": {
        type: [String],
        default: [],
    }, // has default
    
    // ========TO DO=========
    // messages
});
projectSchema.plugin(uniqueValidator);
// Export the Mongoose model
module.exports = mongoose.model('Project', projectSchema);
