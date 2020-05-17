const bodyParser = require('body-parser');
const request = require("supertest");
const express = require("express");
const app = express();
const ankietaAddRouter = require('../routes/dodajankiete');
const wynikiRouter = require('../routes/wyniki');

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});

app.use('/dodajankiete', ankietaAddRouter);
app.use('/wyniki', wynikiRouter);

test("Get data when get wydzial", done => {
  request(app)
    .get("/dodajankiete/wydzial")
    .expect("Content-Type", /json/)
    .expect(201,done);
});

test("Get data when get wyniki", done => {
  request(app)
    .get("/wyniki")
    .expect("Content-Type", /json/)
    .expect(201,done);
});


