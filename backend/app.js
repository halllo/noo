var express = require('express');
var app = express();
var _ = require('underscore');

var mongourl = require('./db/mongodburl').generate();
var Business = require('./lib/business');


var business = new Business(mongourl);


var port = process.env.VMC_APP_PORT || process.env.PORT || 1337
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.json());
	app.use(app.router);
});
app.listen(port);



app.get('/rates', function(req, res){
	var response = res;
	var name = req.params.name;
	business.getAllRates(function(err, items) {
		if (err) 
			response.send(500, err);
		else 
			response.send(_.map(items, createViewModel));
	});
});

app.get('/rates/:name', function(req, res){
	var response = res;
	var name = req.params.name;
	business.getRates(name, function(err, items) {
		if (err) 
			response.send(500, err);
		else 
			response.send(_.map(items, createViewModel));
	});
});

app.put('/rates/:name', function(req, res){
	var response = res;
	var name = req.params.name;
	var body = req.body;
	business.rate(name, body, function(err, updated) {
		if (err) 
			response.send(500, err);
		else 
			response.send(createViewModel(updated));
	});
});


var createViewModel = function(item) {
	return {
		n: item.name,
		u: item.ups || 0,
		d: item.downs || 0
	};
}



console.log('Server running at http://127.0.0.1:' + port + '/');

module.exports = app;