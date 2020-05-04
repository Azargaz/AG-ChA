const express = require('express')
const app = express()
const port = 3000

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

// App listening on port
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app;