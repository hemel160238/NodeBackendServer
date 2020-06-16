const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Leaders = require('../models/leaders');


const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req, res, next) => {
	Leaders.find({})
		.then((leaders) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(leaders);
		}, (err) => next(err))
		.catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
	Leaders.create(req.body)
		.then((promotion) => {
			console.log('Dish Created ', promotion);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(promotion);
		}, (err) => next(err))
		.catch((err) => next(err));

})
.put(authenticate.verifyUser, (req, res, next) => {
	req.statusCode = 403;
	res.end('Put operation not supported on Leaders ');
})
.delete(authenticate.verifyUser, (req, res, next) => {
	Leaders.remove({})
		.then((resp) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(resp);
		}, (err) => next(err))
		.catch((err) => next(err));
});


leaderRouter.route('/:promoId')
.get((req, res, next) => {
	Leaders.findById(req.params.promoId)
		.then((promotion) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(promotion);
		}, (err) => next(err))
		.catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
	req.statusCode = 403;
	res.end('Post operation not supported on Leaders/'+req.params.promoId);
})
.put(authenticate.verifyUser, (req, res, next) => {
	Leaders.findByIdAndUpdate(req.params.promoId, {
		$set: req.body
	}, {
		new: true
	})
		.then((promotion) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(promotion);
		}, (err) => next(err))
		.catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) => {
	Leaders.findByIdAndRemove(req.params.promoId)
		.then((resp) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(resp);
		}, (err) => next(err))
		.catch((err) => next(err));

});

module.exports = leaderRouter;


