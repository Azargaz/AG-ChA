const bodyParser = require('body-parser');
const request = require("supertest");
const express = require("express");
const app = express();
const wynikiRouter = require('../routes/wyniki');
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use('/wyniki', wynikiRouter);
it('Select answers', function(done) {
    request(app)
      .get('/wyniki/')
      .type('form')
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  app.use('/wyniki', wynikiRouter);
it('Select answers for id', function(done) {
    request(app)
      .get('/wyniki/odpowiedzi/1')
      .type('form')
      .send({id_ankieta:'1'})
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });