require('../../config/index');
var model = require('../models/project');
var tag_model = require('../models/tag');
const async = require('async');
const promise = require('bluebird');
// const auth = require('../auth/authorization');

module.exports.getAll = function(req, res) {
	function callback(res) {
		var ret = function(err, items){
			if (err) {	return res.status(500).json({message : "Error!", data: []});	}
			res.status(200).json({message : "OK", data : items});
		}
		return ret;
	}

	// parse request
	for (var key in req.query) {
		switch(key) {
			case "count":
				req.query["count"] = req.query["count"] == "true";
				break;
			case "sort":
			case "select":
			case "where":
				var str = req.query[key];
				str = str.replace(/,}$/, "}"); // eliminate the trailing comma
				req.query[key] = JSON.parse(str);
				break;
			case "skip":
			case "limit":
				req.query[key] = +req.query[key]
				break;
		}
	}

	if ("count" in req.query && req.query.count == true){ // console.log("count track");
		model.count(req.query["where"], callback(res)); 
	}else{ // console.log("find track");
		model.find(req.query["where"], null, req.query, callback(res))
	}
}

module.exports.addProject = function (req, res){

	var project_info = {
		"name" : req.body['name'],
		"description" : req.body['description'],
		"creator_id" : res.locals.userId,
		// "creator_name": req.body['creator_name'],
		// FAKE NEWS
		"creator_name": "smoooo wear",

		"tag_names" : req.body['tag_names'],
		"required_skills": req.body['required_skills'],
	};

	// hide this for better view
	function report_error(err) {
		var str = '';
		// Validation Error
		if (err['name'] === 'ValidationError'){
			str += 'ValidationError:';
			for (var path in err.errors) {
				str += ' ' + err.errors[path];
			}
		}

		return str;
	}

	// hide this for better view
	function callback_save_tags (err, new_project) {
		if (err) { console.log(err);return res.status(500).json({ message: report_error(err),data:[] });; }

		// create tag documents
		var tag_docs = [], promises = [], tag_ids = [], existing_tags = [];
		req.body['tag_names'].map((curr) => { 
			var tag_info = {
				'name' : curr, 
				'projects':new_project._id,
				'popularity': 1,
			}
			tag_docs.push(new tag_model(tag_info)); 
		});

		// create promises for each save of tag documents
		tag_docs.map((tag_doc) => { 
			var resolve = function(doc) {  tag_ids.push(doc._id);  }; // if succeed (i.e. this is a new tag), push the id into tag_ids
			var reject = function(err) { console.log(report_error(err)); existing_tags.push( tag_doc.name);}; // if rejected (i.e. this is an existing tag), push it to existing_tags 
			promises.push(tag_doc.save().then(resolve).catch(reject));
		});

		// resolved promises (new tags are created; old tags are recorded for later use)
		promise.all(promises).then(function(value){
			console.log("resolved all");
			
			// query for all existing tags
			var existing_tags_pairs = [];
			existing_tags.map((t) => { existing_tags_pairs.push({"name" : t,}); });
			
			// add project to existing tags, increment popularity, set tags id to project (both existing and new)
			tag_model.find({$or : existing_tags_pairs,}, function(err, docs){
				
				// add this project to each of the old tags, increase popularity
				function update_tags(){
					docs.forEach((d) => {
						d.projects.push(new_project._id)
						d.set({
							'projects' : d.projects,
							'popularity': d.projects.length,
						});
						var resolve = function(updated_d){ console.log(updated_d); }
						var reject = function(err){ console.log(err); 
							return res.status(500).json({'message': 'Error when saving new project to tag', data:[], });
						}
						// update tag
						promises.push(d.save().then(resolve).catch(reject));
						tag_ids.push(d._id)
					});
				}

				// update this project with new+old tag ids
				function update_project_with_tag_ids(){
					// all update are saved
					promise.all(promises).then(function(value) {
						// have found old tag ids, save them to this project
						new_project.set({"tags": tag_ids});
						new_project.save(function(err, updated_doc){
							if (err) {
								console.log(">>> Error when saving tags to project (post)"); console.log(err);
								return res.status(500).json({ message: "Tags not saved to project because of some errors", data: [], });
							}
							console.log(">>> Item Saved");
							res.status(200).json({ message:"Added", data: updated_doc });
						});
					}).catch(function(err){
						console.log(err);
						res.status(500).json({message: report_error(err), data: []});
					});	
				}

				if (err) {
					console.log("Error when finding all existing tags"); console.log(err);
					return res.status(500).json( {message: "Error when finding all existing tags (see backend)", data: []});
				}
				var promises = [];
				update_tags();
				update_project_with_tag_ids();
			});
		
		}).catch(function(err) {
			console.log(err);
			res.status(500).json({message: report_error(err), data: []});
		});
	}

	// save to db
	var new_doc = new model(project_info);
	
	// after saving the project, we also want to save the tag_ids
		// for new tags, we just create new documents
		// for existing tags, we need to retrieve them, add this project to 'projects' and increment popularity
	// we then collect tag id's from the two steps above, and update this project with those id's
	new_doc.save(callback_save_tags);
}

module.exports.updatePopularity = function(req, res){
	
	model.findByIdAndUpdate(req.params.id, { $inc: { popularity : 1}}, function(err, updated_doc){
		if (err) {
			console.log(">>> Error (update popularity)");
			return res.status(500).json({message : err['message'], data : []}); // mostly CastError
		}

		if (updated_doc == null){
			console.log(">>> Not found (update popularity)");
			return res.status(404).json({message : err['message'], data : []}); // mostly CastError
		}
		
		console.log(">>> Update Success");
		console.log(updated_doc);
		res.status(200).json({ message: "OK", data: updated_doc, });

	})
}

module.exports.toggleStatus = function(req, res) {
	
	var user_id = res.locals.userId;

	model.findById(req.params.id, function(err, doc){
		if (err) { 
			console.log(">>> Error (update status)");
			return res.status(500).json({message : "Error finding document", data : []});
		}

		if (doc == null){
			console.log(">>> Not Found (update status)");
			return res.status(404).json({message : "Item Not Found", data : []});
		}

		if (doc.creator_id != user_id){
			console.log(">>> Auth Fairlure (update status)");
			return res.status(403).json({message : "Item Not Found", data : []});
		}

		doc.set({
			"creator_id" : doc.creator_id,
			"creator_name" : doc.creator_name,
			"name" : doc.name,
			"status" : doc.status ^ 1,
		});
		
		doc.save(function(err, updated_doc){
			if (err) {
				console.log(">>> Error (update status)");
				return res.status(500).json({message : err['message'], data : []}); // mostly CastError
			}
			console.log(">>> Update Status Success");
			return res.status(200).json({ message: "OK", data: updated_doc, });
		});
	});

}

module.exports.getOne = function(req, res){

	model.findOne({ '_id' : req.params.id}, function(err, doc){
		if (err) {
			console.log(">>> Error (getOne)");
			return res.status(500).json({message : err['message'], data : []}); 
		}
		if (doc == null) {
			console.log(">>> Error (getOne)");
			return res.status(404).json({message : "Item Not Found", data : []});
		}
		
		res.status(200).json({message : "OK", data : doc});
	})
}

module.exports.remove = function(req, res) {
	console.log(">>> Delete: " + req.params.id);
	
	model.findByIdAndRemove(req.params.id, function(err, doc){
		if (err) {
			console.log(">>> Error (remove)");
			res.status(500).json({message : err['message'], data : []}); // mostly CastError
			return;
		}
		if (doc == null) {
			console.log(">>> Item Not Found (remove)");
			res.status(404).json({message : "Item Not Found", data : []});
			return;
		}

		res.status(200).json({message: "OK", data: doc});
		
		// Decrement popularity for each tags, delete if under zero
		var tag_ids = [];
		doc["tags"].forEach((t) => { tag_ids.push({ '_id': t }); });
		tag_model.find({ $or : tag_ids, }, function(err, docs){
			docs.forEach((d) => {
				if (d.popularity > 1){
					d.set({
						'name' : d.name,
						'popularity' : d.popularity - 1,
					});
					d.save().catch(function(err){	console.log(err);	});
				}else{
					tag_model.findByIdAndRemove(d._id, function(err,v){console.log(err);});
				}
			});
		});
	})
}




// ===========================Fine ^============================= //


// name, description, time_created, creator_id, tags, tag_names, creator_name, popularity, status, required_skills


function auth(req, res) {
	var token = req.headers['x-access-token'];
	if (!token) {
		console.log(">>> Error (No token provided)");
		res.status(401).json({ auth: false, message: 'No token provided.', data:[], });
		return -1;
	}

	jwt.verify(token, config.secret, function(err, decoded) {
		if (err) {
			console.log(">>> Error (Failed taken)");
			res.status(500).json({ auth: false, message: 'Failed to authenticate token.', data: [], });
			return -2;
		}

		return decoded;
	});
}

module.exports.update = function(req, res) {
	console.log(">>> Update: " + req.params.id);
	const details = { '_id' : req.params.id};
	const content = req.body;
	
	// authorize user ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// const user_id = auth(req, res);
	// if (user_id < 0) { return; }

	model.findById(req.params.id, function(err, doc){
		if (err) {
			console.log(">>> Error (update)");
			res.status(500).json({message : err['message'], data : []}); // mostly CastError
			return;
		}
		if (doc == null) {
			console.log(">>> Error (update)");
			res.status(404).json({message : "Item Not Found", data : []});
			return;
		}

		console.log(">>> Found Item (update)");

		// Check user authorization ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// if (doc.creator_id != user_id){
		// 	console.log(">>> Error (update: user not authorized)");
		// 	res.status(500).json({message: "Not Authorized To Update", data: {}});
		// }

		doc.set(content);
		doc.save(function(err, updated_doc){
			if (err) {
				console.log(err);
				res.status(500).json({ message: err['message'], data: [], });
				return;
			}
			console.log(">>> Update Success");
			console.log(updated_doc);
			res.status(200).json({ message: "OK", data: updated_doc, });
		});
	})
}


module.exports.getTags = function(req, res) {
	const id = req.params.id;
	const details = { '_id' : id};
	model.findOne(details, function(err, doc){
		if (err) {
			console.log(">>> Error (getOne)");
			res.status(404).json({message : err['message'], data : []}); // mostly CastError
			return;
		}
		if (doc == null) {
			console.log(">>> Error (getOne)");
			res.status(404).json({message : "Item Not Found", data : []});
			return;
		}

		// console.log(doc);
		var query_tags = [];
		for (var idx = 0; idx < doc.tags.length; idx++){
			console.log(doc.tags[idx]);
			query_tags.push({"_id": doc.tags[idx]});
		}

		tag_model.find({$or: query_tags}, function(err, docs){ 
			if (err) {
				res.status(500).json({ message: "Error", data:[], });
				return;
			}
			res.status(200).json({ message: "OK", data: docs});
		});
	})	
}

module.exports.addTags = function(req, res) {
	const id = req.params.id;
	const details = { '_id' : id};
	if (!("tags" in req.body) || req.body.tags.length == 0){
		res.status(200).json( {message: "OK (no tag provided)", data: []});
		return;
	}

	model.findOne(details, function(err, doc){
		if (err) {
			console.log(">>> Error (getOne)");
			res.status(404).json({message : err['message'], data : []}); // mostly CastError
			return;
		}
		if (doc == null) {
			console.log(">>> Error (getOne)");
			res.status(404).json({message : "Item Not Found", data : []});
			return;
		}

		// console.log(doc);		
		var origin_tags = new Set(doc.tags.map((curr) => {
			return curr.toString();
		}));
		for (var idx = 0; idx < req.body.tags.length; idx++){
			origin_tags.add(req.body.tags[idx]);
		}

		doc.set({"tags": Array.from(origin_tags)});
		doc.save(function(err, updated_doc){
			if (err) {
				console.log(err);
				res.status(500).json({ message: err['message'], data: [], });
				return;
			}
			console.log(">>> Update Success");
			res.status(200).json({ message: "OK", data: updated_doc, });
		});
	});
}




// =======================Delete later======================== //
// function fake_remove (req, res) {
// 	console.log(">>> Delete: " + req.params.id);
	
// 	// authorize user ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 	// if (auth_check) {
// 	// 	const user_id = auth(req);
// 	// 	if (user_id < 0) { return; }
// 	// }

// 	model.findById(req.params.id, function(err, doc){
// 		if (err) {
// 			console.log(">>> Error (remove)");
// 			res.status(404).json({message : err['message'], data : []}); // mostly CastError
// 			return;
// 		}
// 		if (doc == null) {
// 			console.log(">>> Item Not Found (remove)");
// 			res.status(404).json({message : "Item Not Found", data : []});
// 			return;
// 		}

// 		console.log(">>> Found Item (remove)");
// 		// Check user authorization ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 		// if (auth_check && doc.creator_id != user_id){
// 		// 	console.log(">>> Error (remove: user not authorized)");
// 		// 	res.status(500).json({message: "Not Authorized To Remove", data: {}});
// 		// }

// 		model.deleteOne({'_id' : req.params.id}, function(err, result){
// 			if (err) {
// 				console.log(">>> Error (remove)");
// 				res.status(404).json({message : err['message'], data : []}); // mostly CastError
// 				return;
// 			}
// 			res.status(200).json({ message: "Item Deleted", data: [] });
// 		})

// 	})
// }





