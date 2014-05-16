var express = require('express');
var app = express();

var mongourl = require('./db/mongodburl').generate();
var Business = require('./lib/business');


var business = new Business(mongourl);


var port = process.env.VMC_APP_PORT || process.env.PORT || 1337
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
	app.use(app.router);
});
app.listen(port);



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
	var body = req.body;
	response.send(business.rate(name, body));
});



console.log('Server running at http://127.0.0.1:' + port + '/');

module.exports = app;