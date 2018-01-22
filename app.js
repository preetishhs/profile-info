var express = require('express');
var path = require('path');
var logger = require('morgan');
var unirest = require('unirest');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000,
	ip   = process.env.IP || '127.0.0.1';
	

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function(req, res, next) {
	res.status(200).send('Welcome to your profile');
});

app.get('/profile', function(req, res, next) {
	unirest.get(process.env.profile_url)
	.end(function (response) {
		if(response) {
			res.type('json');
			res.status(200).send(response);
		} else {
			res.status(404).send('Profile not found');
		}
	});
});

// handling 404 errors
app.use('*', function(req, res, next) {
	res.status(404).send({'message':'Requested resource not found on server'});
});

try {
	app.listen(port);
	console.log('Server running on http://%s:%s', ip, port);
}
catch(e) {
	console.info('Could not start the server: ' + e.message);
}

module.exports = app;
