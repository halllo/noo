supertest = require "supertest"
chai = require "chai"
expect = chai.expect
mongoose = require 'mongoose'

describe "Backend", ->
	
	app = require "../app"
	get = (url) -> supertest(app).get(url)
	put = (url) -> supertest(app).put(url)
	errorOrDone = (done, err) -> 
		throw err if err
		done()

	beforeEach (done) -> 
		mongoose.connection.db.dropDatabase (err) -> done()


	describe "Website", ->

		it "returns index", (done) ->
			get '/' 
				.expect 'like or dislike'
				.end (err, res) -> errorOrDone(done, err)


	describe "Service API", ->
	
		it "returns all rates", (done) ->
			get '/rates' 
				.expect {}
				.end (err, res) -> errorOrDone(done, err)

		it "gets rates of 'thing'", (done) ->
			get '/rates/thing' 
				.expect {}
				.end (err, res) -> errorOrDone(done, err)

		it "rates a 'thing' without body does not work", (done) ->
			put '/rates/thing' 
				.send { } 
				.expect 'not a valid rating'
				.end (err, res) -> errorOrDone(done, err)

		it "rates a 'thing' invalid does not work 1", (done) ->
			put '/rates/thing' 
				.send { "upOrDown": "nah" } 
				.expect 'not a valid rating'
				.end (err, res) -> errorOrDone(done, err)

		it "rates a 'thing' invalid does not work 2", (done) ->
			put '/rates/thing' 
				.send { "blkafd": "nah" } 
				.expect 'not a valid rating'
				.end (err, res) -> errorOrDone(done, err)

		it "rates a 'thing' up", (done) ->
			put '/rates/thing' 
				.send { "upOrDown": "up" } 
				.expect { "n": "thing", "u": 1, "d": 0 }
				.end (err, res) -> errorOrDone(done, err)

		it "rates a 'thing' down", (done) ->
			put '/rates/thing' 
				.send { "upOrDown": "down" } 
				.expect { "n": "thing", "u": 0, "d": 1 }
				.end (err, res) -> errorOrDone(done, err)

		it "rates a 'thing' up twice and down once", (done) ->
			put '/rates/thing' 
				.send { "upOrDown": "up" } 
				.end (err, res) -> 
			put '/rates/thing' 
				.send { "upOrDown": "up" } 
				.end (err, res) -> 
			put '/rates/thing' 
				.send { "upOrDown": "down" } 
				.end (err, res) -> 
			get '/rates/thing' 
				.expect [{ "n": "thing", "u": 2, "d": 1 }]
				.end (err, res) -> errorOrDone(done, err)