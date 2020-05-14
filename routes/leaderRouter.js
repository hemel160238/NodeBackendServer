const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req, res, next) => {
	res.end('Will send all the leaders to you ');
})
.post((req, res, next) => {
	res.end('Will add the leader ' + req.body.name + ' with detailes: '+ req.body.description);
})
.put((req, res, next) => {
	req.statusCode = 403;
	res.end('Pu operation not supported on leader ');
})
.delete((req, res, next) => {
	res.end('Deleting all the leaders! ');
});



leaderRouter.route('/:leaderId')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req, res, next) => {
	res.end('Will send details of the to you: '+ req.params.leaderId)
})
.post((req, res, next) => {
	req.statusCode = 403;
	res.end('Post operation not supported on leaders/'+req.params.leaderId);
})
.put((req, res, next) => {
	res.write(" Updating those ");
	res.end('Will update the leader with details:'+req.body.description);
})
.get((req, res, next) => {
	res.end('Deleting all the leaders! ');
})
.delete((req, res, next) => {
	res.end('Deleting : '+req.params.leaderId);
});

module.exports = leaderRouter;


