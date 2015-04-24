var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Info = mongoose.model('Info');
var Collab = mongoose.model('Collab')
//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/');
};

//Register the authentication middleware
router.use('/infos', isAuthenticated);

router.route('/infos')
	
	//gets all Infos
	.get(function(req, res){
		console.log('-----------debug1: get success!----------');
		Info.find(function(err, infos){
			console.log('-----------debug2: get all infos !-----------');
			if(err){
				return res.send(500, err);
			}
			return res.status(200).send(infos);
		});
	});


	router.use('/collabs', isAuthenticated);

router.route('/collabs')
	
	//gets all Infos
	.get(function(req, res){
		console.log('-----------debug1: get success!----------');
		Collab.find(function(err, infos){
			console.log('-----------debug2: get all collabs !-----------');
			if(err){
				return res.send(500, err);
			}
			return res.status(200).send(infos);
		});
	});

// //1.2 : post-specific commands. likely won't be used

module.exports = router;


// // 1.1:creates a new post
	// .post(function(req, res){

	// 	var post = new Post();
	// 	post.text = req.body.text;
	// 	post.created_by = req.body.created_by;
	// 	post.save(function(err, post) {
	// 		if (err){
	// 			return res.send(500, err);
	// 		}
	// 		return res.json(post);
	// 	});
	// })

// //1.2 : post-specific commands. likely won't be used
// router.route('/infos/:id')
// 	//gets specified post
// 	.get(function(req, res){
// 		Post.findById(req.params.id, function(err, post){
// 			if(err)
// 				res.send(err);
// 			res.json(post);
// 		});
// 	}) 
// 	//updates specified post
// 	.put(function(req, res){
// 		Post.findById(req.params.id, function(err, post){
// 			if(err)
// 				res.send(err);

// 			post.created_by = req.body.created_by;
// 			post.text = req.body.text;

// 			post.save(function(err, post){
// 				if(err)
// 					res.send(err);

// 				res.json(post);
// 			});
// 		});
// 	})
// 	//deletes the post
// 	.delete(function(req, res) {
// 		Post.remove({
// 			_id: req.params.id
// 		}, function(err) {
// 			if (err)
// 				res.send(err);
// 			res.json("deleted :(");
// 		});
// 	});