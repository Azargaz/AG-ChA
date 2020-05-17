const bodyParser = require('body-parser');
const request = require("supertest");
const express = require("express");
const app = express();
const usersRouter = require('../routes/users');
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use('/users', usersRouter);
it('Login pracownik should respond with 200', function(done) {
    request(app)
      .post('/users/pracowniklogin')
      .type('form')
      .send({login:"admin",haslo:"admin"})
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('Login pracownik should respond with 500 - wrong username', function(done) {
    request(app)
      .post('/users/pracowniklogin')
      .type('form')
      .send({login:"a",haslo:"admin"})
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('Login pracownik should respond with 500 - wrong password', function(done) {
    request(app)
      .post('/users/pracowniklogin')
      .type('form')
      .send({login:"admin",haslo:"ad"})
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('Login student should respond with 200', function(done) {
    request(app)
      .post('/users/studentlogin')
      .type('form')
      .send({indeks:99999 ,pesel:12345678987})
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('Login student should respond with 500 - wrong indeks', function(done) {
    request(app)
      .post('/users/studentlogin')
      .type('form')
      .send({indeks:9999 ,pesel:12345678987})
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('Login student should respond with 500 - wrong pesel', function(done) {
    request(app)
      .post('/users/studentlogin')
      .type('form')
      .send({indeks:99999,pesel:13434343333})
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });