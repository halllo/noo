var express = require('express');
var app = express();

var mongourl = require('./db/mongodburl').generate();
var Business = require('./lib/business');


var business = new Business(mongourl);


var port = process.env.VMC_APP_PORT || process.env.PORT || 1337
app.configure(function(){
	app.use(express.static(__dirname + '/public'));

	console.log("TODO: app.use(express.bodyParser()); is vulnerable to a resource depletion attack")
	//http://andrewkelley.me/post/do-not-use-bodyparser-with-express-js.html

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
			response.send(items);
	});
});

app.get('/rates/:name', function(req, res){
	var response = res;
	var name = req.params.name;
	business.getRates(name, function(err, items) {
		if (err) 
			response.send(500, err);
		else 
			response.send(items);
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
		{
			console.log("TODO: why dont i get the upserted element back?")
			response.send(updated);
		}
	});
});



console.log('Server running at http://127.0.0.1:' + port + '/');

module.exports = app;