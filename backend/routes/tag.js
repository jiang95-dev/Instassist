var model = require('../models/tag.js');

module.exports.getAll = function(req, res) {
	function callback(res) {
		var ret = function(err, items){
			if (err) {
				res.status(500).json({message : "Error!", data: []});
				return;
			}
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

	if ("count" in req.query && req.query.count == true){
		// console.log("count track");
		model.count(req.query["where"], callback(res)); 
	}else{
		// console.log("find track");
		model.find(req.query["where"], null, req.query, callback(res))
	}
}

module.exports.post = function(req, res) {
	// deep copy
	var tag_info = {
		'name' : req.body['name'],
		'projects' : req.body['projects'] || [],
		'popularity' : req.body['projects'] ? req.body['projects'].length : 0,
	}

	// save to db
	var new_doc = new model(tag_info);
	new_doc.save((function (err, doc){
		if (err) {
			console.log(">>> Error adding new tag");
			return res.status(500).json({ message: require('./utilities').report_error(err),data:[] });
		}
		console.log(">>> Item Saved");
		res.status(201).json({ message:"Added", data: doc });
	}));
}

module.exports.getOne = function(req, res){

	model.findById(req.params.id).populate('projects').exec(function(err, doc){
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

		doc.populate('projects')
		res.status(200).json({message : "OK", data : doc});
	});
}

// module.exports.update = function(req, res) {
// }

// module.exports.remove = function(req, res) {
// }
