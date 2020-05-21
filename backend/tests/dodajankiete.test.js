const bodyParser = require('body-parser');
const request = require("supertest");
const express = require("express");
const app = express();
const dodajAnkieteRouter = require('../routes/dodajankiete');
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);


app.use('/dodajankiete', dodajAnkieteRouter);
it('Select department', function(done) {
    request(app)
      .get('/dodajankiete/wydzial')
      .type('form')
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });


  app.use('/dodajankiete', dodajAnkieteRouter);
it('Select course', function(done) {
    request(app)
      .get('/dodajankiete/kierunek/1')
      .type('form')
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  app.use('/dodajankiete', dodajAnkieteRouter);
  it('Select subject', function(done) {
      request(app)
        .get('/dodajankiete/przedmiot/1/1')
        .type('form')
        .expect("Content-Type", /json/)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    app.use('/dodajankiete', dodajAnkieteRouter);
    it('Select professor lecturing chosen subject', function(done) {
        request(app)
          .get('/dodajankiete/prowadzacy/1/1/1')
          .type('form')
          .expect("Content-Type", /json/)
          .expect(201)
          .end(function(err, res) {
            if (err) return done(err);
            done();
          });
      });

      app.use('/dodajankiete', dodajAnkieteRouter);
      it('Select professor', function(done) {
          request(app)
            .get('/dodajankiete/studenci/1')
            .type('form')
            .expect("Content-Type", /json/)
            .expect(201)
            .end(function(err, res) {
              if (err) return done(err);
              done();
            });
        });
