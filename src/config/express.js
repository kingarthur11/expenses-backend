const express = require('express');
const httpStatus = require('http-status');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('../api/routes/v1');
const { errorConverter, errorHandler } = require('../api/middleware/error');
const ApiError = require('../api/utils/ApiError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

app.use('/api', routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
