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
const ankietaRouter = require('./routes/ankieta');
const ankietaAddRouter = require('./routes/dodajankiete');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ankietydowypelnienia', ankietaRouter);
app.use('/ankietywypelnij', ankietaRouter);


app.use('/dodajankiete/wydzial', ankietaAddRouter);
app.use('/dodajankiete/kierunek', ankietaAddRouter);
app.use('/dodajankiete/prowadzacy', ankietaAddRouter);
app.use('/dodajankiete/przedmiot', ankietaAddRouter);
app.use('/dodajankiete',ankietaRouter);

// App listening on port
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app;