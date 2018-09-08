//dependencies
const express = require('express');
const bodyParser = require('body-parser');

//model (this is oor schema)
const Pets = require('../models/pets');

const petRouter = express.Router();

//here is established the parseo of the posts
petRouter.use(bodyParser.json());

//Here is establishes the get, post, put and delete for our collection (pets)

petRouter.route('/') //here was established the route for all pets
//GEt all data of the pets
.get((req, res, next) => {
	Pets.find({})
	.then((pets) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(pets);
	}, (err) => next(err))
	.catch((err) => next(err));
})
//This for to create a new pet based on the creation fields specified in the endpoint documentation
.post((req, res, next) => {
	Pets.create(req.body)
	.then((pet) => {
		console.log('Pet Created ', pet);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(pet);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.put((req, res, next) => {
	res.statusCode = 403;
	res.end("Put operationd isn't support on /pets");
})
//if you want delete all data in the collection. Use this.
.delete((req, res, next) => {
	Pets.remove({})
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});

//here was established the route for specific pet
petRouter.route('/:petId')
.get((req, res, next) => {
	Pets.findById(req.params.petId)
	.then((pet) => {
		if (pet != null) {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(pet);
		}
		else{
			err = new Error('Pet ' + req.params.petId + ' not found');
			err.status = 404;
			return next(err);
		}
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post((req, res, next) => {
	res.statusCode = 403;
	res.end("POST operation isn't supported on /pets/" + 
		req.params.petId);
})
.put((req, res, next) => {
	Pets.findByIdAndUpdate(req.params.petId, {
		$set: req.body
	}, {new: true})
	.then((pet) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(pet);
	}, (err) =>(err));
})
.delete((req, res, next) => {
	Pets.findByIdAndRemove(req.params.petId)
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});

//here was established the route for specific pet ans its comments
petRouter.route('/:petId/comments')
.get((req, res, next) => {
	Pets.findById(req.params.petId)
	.then((pet) => {
		if (pet != null) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(pet.comments);
		}
		else {
			err = new Error('Pet ' + req.params.petId + ' not found');
			err.status = 404;
			return next(err);
		}
		
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post((req, res, next) => {
	Pets.findById(req.params.petId)
	.then((pet) => {
		if (pet != null) {
			pet.comments.push(req.body);
			pet.save()
			.then((pet) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(pet.comments);
			}, err => next(err));
		}
		else {
			err = new Error('Pet ' + req.params.petId + ' not found');
			err.status = 400;
			return next(err);
		}
	}, (err) => next(err))
	.catch((err) => next(err));
})
.put((req, res, next) => {
	res.statusCode = 403;
	res.end("PUT operation isn't supported on pets/" +req.params.petId+"/comments");
})
.delete((req, res, next) => {
	Pets.findById(req.params.petId)
	.then((pet) => {
		if (pet != null ) {
			for(var i = (pet.comments.length -1); i>=0; i--){
				pet.comments.id(pet.comments[i]._id).remove();
			}
			pet.save()
			.then((pet) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(pet.comments);
			}, err => next(err));
		}else {
			err = new Error('Pet ' + req.params.petId + ' not found');
			err.status = 400;
			return next(err);
		}
	}, (err => next(err)))
	.catch((err) => next(err));
});
//here was established the route for specific comment of pet
petRouter.route('/:petId/comments/:commentId')
.get((req, res, next) => {
	Pets.findById(req.params.petId)
	.then((pet) => {
		if (pet != null && pet.comments.id(req.params.commentId) != null) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(pet.comments.id(req.params.commentId));
		}else if(pet == null){
			err = new Error('Pet ' + req.params.petId + ' not found');
			err.status = 400;
			return next(err);
		}else {
			err = new Error('Comment ' + req.params.commentId + ' not found');
			err.status = 400;
			return next(err);
		}
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post((req, res, next) => {
	res.statusCode = 403;
	res.end("Post operation isn't supported on /pets/" +
		req.params.petId + '/comments/'+req.params.commentId);
})
.put((req, res, next) => {
	Pets.findById(req.params.petId)
	.then((pet) => {
		if (pet != null && pet.comments.id(req.params.commentId) != null) {
			if (req.body.rating) {
				pet.comments.id(req.params.commentId).rating = req.body.rating;
			}
			if (req.body.comment) {
				pet.comments.id(req.params.commentId).comment =  req.body.comment;
			}
			pet.save()
			.then((pet) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(pet);
			}, (err) => next(err));
		}else if(pet == null) {
			err = new Error('Pet ' +req.params.petId + ' not found');
			err.status = 404;
			return next(err);
		}else {
			err = new Error('Comment ' + req.params.commentId + ' not found');
			err.status = 404;
			return next(err);
		}
	}, (err) => next(err))
	.catch((err) => next(err));
})
.delete((req, res, next) => {
	Pets.findById(req.params.petId)
	.then((pet) => {
		if (pet != null && pet.comments.id(req.params.commentId) != null) {
			pet.comments.id(req.params.commentId).remove();
			pet.save()
			.then((pet) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(pet);
			}, (err) => next(err));
		} else if (pet == null) {
			err = new Error('Pet ' + req.params.petId + ' not found');
			err.status = 404;
			return next(err);
		}else {
			err = new Error('Comment ' + req.params.commentId + ' not found');
			err.status = 404;
			return next(err);
		}
	}, (err) => next(err))
	.catch((err) => next(err));
});

module.exports = petRouter;