const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { NOT_FOUND } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use((req, _res, next) => {
  req.user = {
    _id: '64b9497d9db7a74f965be949',
  };

  next();
});

app.use(routes);

app.use('*', (_req, res) => {
  res.status(NOT_FOUND).json({ message: 'Страница не найдена' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
