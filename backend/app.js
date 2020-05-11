const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

require('dotenv').config()

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

//////////////////////////////////////sql routes//////////
const usersRouter = require('./routes/users');
const ankietaRouter = require('./routes/ankieta');
const ankietaAddRouter = require('./routes/dodajankiete');
const wynikiRouter = require('./routes/wyniki');
const odpowiedziRouter = require('./routes/odpowiedzi');

app.use('/users', usersRouter);
app.use('/ankieta', ankietaRouter);
app.use('/dodajankiete', ankietaAddRouter);
app.use('/wyniki', wynikiRouter);
app.use('/odpowiedzi', odpowiedziRouter);

// App listening on port
app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = app;
