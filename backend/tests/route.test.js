const bodyParser = require('body-parser');
const request = require("supertest");
const express = require("express");
const app = express();
const usersRouter = require('../routes/users');
const ankietaAddRouter = require('../routes/dodajankiete');
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});

app.use('/dodajankiete', ankietaAddRouter);
app.use('/users', usersRouter);

test("Get data when get wydzial", done => {
  request(app)
    .get("/dodajankiete/wydzial")
    .expect("Content-Type", /json/)
    .expect(201,done);
});

