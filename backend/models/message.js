// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var MessageSchema = new mongoose.Schema({
	// id?
    content: String,
    sender_id: Schema.Types.ObjectId,
    receiver_id: Schema.Types.ObjectId, // or [Schema.Types.ObjectId]?
    project_id: Schema.Types.ObjectId,
});

// Export the Mongoose model
module.exports = mongoose.model('Tag', MessageSchema);
