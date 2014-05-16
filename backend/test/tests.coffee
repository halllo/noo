supertest = require "supertest"
chai = require "chai"
expect = chai.expect

describe "app", ->
	
	app = require "../app"
	get = (url) -> supertest(app).get(url)
	put = (url) -> supertest(app).put(url)
	errorOrDone = (done, err) -> 
		throw err if err
		done()

	it "returns index", (done) ->
		get '/' 
			.expect 'like or dislike'
			.end (err, res) -> errorOrDone(done, err)

	it "returns all rates", (done) ->
		get '/rates' 
			.expect 'list of all reates, but no rates yes'
			.end (err, res) -> errorOrDone(done, err)

	it "gets rates of 'thing'", (done) ->
		get '/rates/thing' 
			.expect 'no rates for "thing"'
			.end (err, res) -> errorOrDone(done, err)

	it "rates a 'thing' up", (done) ->
		put '/rates/thing' 
			.send { "upOrDown": "up" } 
			.expect 'up rated "thing"'
			.end (err, res) -> errorOrDone(done, err)

	it "rates a 'thing' down", (done) ->
		put '/rates/thing' 
			.send { "upOrDown": "down" } 
			.expect 'down rated "thing"'
			.end (err, res) -> errorOrDone(done, err)