const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
//////////////////////////////////////sql routes//////////
const ankieta = require('./routes/ankieta')

app.use('/', indexRouter);
app.use('/users', usersRouter);

// App listening on port
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app;