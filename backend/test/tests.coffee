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

	it "gets rates of thing", (done) ->
		get '/rates/thing' 
			.expect 'no rates for "thing"'
			.end (err, res) -> errorOrDone(done, err)

	it "rates a thing", (done) ->
		put '/rates/thing' 
			.expect 'rated "thing"'
			.end (err, res) -> errorOrDone(done, err)