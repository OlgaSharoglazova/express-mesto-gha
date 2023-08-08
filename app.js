const express = require('express');
const cookies = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { NOT_FOUND } = require('./utils/constants');
const errors = require('./middlewares/errors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cookies());

app.use(routes);

app.use('*', (_req, res) => {
  res.status(NOT_FOUND).json({ message: 'Страница не найдена' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(errors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
