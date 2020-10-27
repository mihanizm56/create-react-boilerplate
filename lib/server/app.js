const dotenv = require('dotenv');
const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { devServerLog } = require('../utils/dev-server-logger');
const { rootRouter } = require('./router/root');

// prepare config
dotenv.config();
const app = express();
const PORT = 8080;

// middlewares
app.use(cors({ origin: '*' }));
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// router
app.use('/api/v1', rootRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// eslint-disable-next-line
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

app.listen(PORT, () =>
  devServerLog('info', `mock server started on port ${PORT}`),
);
