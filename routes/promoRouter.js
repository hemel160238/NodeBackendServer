const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req, res, next) => {
	res.end('Will send all the promos to you ');
})
.post((req, res, next) => {
	res.end('Will add the promo ' + req.body.name + ' with detailes: '+ req.body.description);
})
.put((req, res, next) => {
	req.statusCode = 403;
	res.end('Pu operation not supported on promos ');
})
.delete((req, res, next) => {
	res.end('Deleting all the promos! ');
});



promoRouter.route('/:promoId')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req, res, next) => {
	res.end('Will send details of the to you: '+ req.params.promoId)
})
.post((req, res, next) => {
	req.statusCode = 403;
	res.end('Post operation not supported on promos/'+req.params.promoId);
})
.put((req, res, next) => {
	res.write(" Updating those ");
	res.end('Will update the promo with details:'+req.body.description);
})
.get((req, res, next) => {
	res.end('Deleting all the promos! ');
})
.delete((req, res, next) => {
	res.end('Deleting : '+req.params.promoId);
});

module.exports = promoRouter;


