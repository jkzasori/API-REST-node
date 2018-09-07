const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Pets = require('../models/pets');

const petRouter = express.Router();
petRouter.use(bodyParser.json());

petRouter.route('/')
.get((req, res, next) => {
	Pets.find({})
	.then((pets) => {
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(pets);
	}, (err) => next(err))
	.catch((err) => next(err));
});

module.exports = petRouter;