const bodyParser = require('body-parser');
const request = require("supertest");
const express = require("express");
const app = express();
const odpowiedziRouter = require('../routes/odpowiedzi');
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use('/odpowiedzi', odpowiedziRouter);
it('Already exist', function(done) {
  const originalError = console.error;
  console.error = jest.fn();
    request(app)
      .post('/odpowiedzi/1')
      .type('form')
      .send({id_ankieta:'1',id_pytanie:'1',id_student:'1',tresc:"dsa"})
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  app.use('/odpowiedzi', odpowiedziRouter);
it('Select questionnaire', function(done) {
    request(app)
      .get('/odpowiedzi/ankieta/1')
      .type('form')
      .send({id_ankieta:'1'})
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  app.use('/odpowiedzi', odpowiedziRouter);
it('Select questionnaire that not exists', function(done) {
  const originalError = console.error;
  console.error = jest.fn();
    request(app)
      .get('/odpowiedzi/ankieta/9999')
      .type('form')
      .send({id_ankieta:'9999'})
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  app.use('/odpowiedzi', odpowiedziRouter);
  it('Select questionnaire', function(done) {
    // const originalError = console.error;
    // console.error = jest.fn();
      request(app)
        .get('/odpowiedzi/1/1')
        .type('form')
        .send({id_ankieta:'1', id_student:'1'})
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

 