'use strict';

const express = require('express');
require('dotenv').config();
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const PORT = process.env.PORT || 3002;
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');
const catsRouter = require('./routes/cats');
const clothesRouter = require('./routes/clothes');


// design principle:  singleton
const app = express();
app.use(logger);
app.use(express.json());
app.use(catsRouter);
app.use(clothesRouter);


app.get('/', (req, res, next) => {
  res.status(200).send('Hello World');
});

app.get('/person', validator);

app.get('/bad', (req, res, next) => {
  next('this is a bad route');
});

app.use('*', notFound);

app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

module.exports = { app, start};
