const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Providers = require('../models/providers');

const providerRouter = express.Router();
providerRouter.use(bodyParser.json());

providerRouter.route('/')
.get((req, res, next) => {
	Providers.find({})
	.then((providers) => {
		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.json(providers);
	}, (err) => next(err))
	.catch((err) => next(err));
});

module.exports = providerRouter;