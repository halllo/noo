var express = require('express');
var app = express();

var business = require('./lib/business');

app.get('/', function(req, res){
	var response = res;
	response.send('like or dislike');
});

app.get('/rates', function(req, res){
	var response = res;
	var name = req.params.name;
	response.send(business.getAllRates());
});

app.get('/rates/:name', function(req, res){
	var response = res;
	var name = req.params.name;
	response.send(business.getRates(name));
});

app.put('/rates/:name', function(req, res){
	var response = res;
	var name = req.params.name;
	response.send(business.rate(name));
});

var port = process.env.VMC_APP_PORT || process.env.PORT || 1337
app.listen(port);

console.log('Server running at http://127.0.0.1:' + port + '/');


module.exports = app;